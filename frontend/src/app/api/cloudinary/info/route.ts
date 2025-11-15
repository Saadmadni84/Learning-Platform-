import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dv6ijui25',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
})

export async function POST(request: NextRequest) {
  try {
    const { publicId } = await request.json()

    if (!publicId) {
      return NextResponse.json({ error: 'No public ID provided' }, { status: 400 })
    }

    // Get image info from Cloudinary
    const result = await cloudinary.api.resource(publicId)

    return NextResponse.json({
      success: true,
      data: result
    })

  } catch (error) {
    console.error('Cloudinary info error:', error)
    return NextResponse.json(
      { error: 'Failed to get image info', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
