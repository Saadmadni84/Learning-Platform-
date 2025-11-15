import { v2 as cloudinary } from 'cloudinary';
import { env } from '../config/env';
import { logger } from '../utils/logger';

// Configure Cloudinary
cloudinary.config({
  cloud_name: env.CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  format: string;
  resource_type: string;
  bytes: number;
  width?: number;
  height?: number;
  duration?: number;
}

export class CloudinaryService {
  /**
   * Upload a video from a remote URL to Cloudinary
   * @param videoUrl - The remote video URL to upload
   * @param options - Additional upload options
   * @returns Promise<CloudinaryUploadResult>
   */
  static async uploadVideoFromUrl(
    videoUrl: string,
    options: {
      public_id?: string;
      folder?: string;
      transformation?: any;
    } = {}
  ): Promise<CloudinaryUploadResult> {
    try {
      logger.info(`Starting video upload from URL: ${videoUrl}`);

      const uploadOptions = {
        resource_type: 'video' as const,
        public_id: options.public_id,
        folder: options.folder || 'videos',
        transformation: options.transformation,
        // Enable eager transformations for video processing
        eager: [
          { width: 1280, height: 720, crop: 'scale', quality: 'auto' },
          { width: 854, height: 480, crop: 'scale', quality: 'auto' },
          { width: 640, height: 360, crop: 'scale', quality: 'auto' }
        ],
        // Generate thumbnails
        eager_async: true,
        // Set video format
        format: 'mp4',
        // Enable audio
        audio_codec: 'aac',
        // Set video quality
        quality: 'auto',
        // Enable streaming
        streaming_profile: 'auto'
      };

      const result = await cloudinary.uploader.upload(videoUrl, uploadOptions);

      logger.info(`Video uploaded successfully. Public ID: ${result.public_id}`);

      return {
        public_id: result.public_id,
        secure_url: result.secure_url,
        format: result.format,
        resource_type: result.resource_type,
        bytes: result.bytes,
        width: result.width,
        height: result.height,
        duration: result.duration
      };
    } catch (error) {
      logger.error('Cloudinary video upload failed:', error);
      throw new Error(`Failed to upload video to Cloudinary: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Delete a video from Cloudinary
   * @param publicId - The public ID of the video to delete
   * @returns Promise<boolean>
   */
  static async deleteVideo(publicId: string): Promise<boolean> {
    try {
      logger.info(`Deleting video with public ID: ${publicId}`);
      
      const result = await cloudinary.uploader.destroy(publicId, {
        resource_type: 'video'
      });

      if (result.result === 'ok') {
        logger.info(`Video deleted successfully: ${publicId}`);
        return true;
      } else {
        logger.warn(`Failed to delete video: ${publicId}. Result: ${result.result}`);
        return false;
      }
    } catch (error) {
      logger.error('Cloudinary video deletion failed:', error);
      throw new Error(`Failed to delete video from Cloudinary: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get video information from Cloudinary
   * @param publicId - The public ID of the video
   * @returns Promise<any>
   */
  static async getVideoInfo(publicId: string): Promise<any> {
    try {
      logger.info(`Getting video info for: ${publicId}`);
      
      const result = await cloudinary.api.resource(publicId, {
        resource_type: 'video'
      });

      return result;
    } catch (error) {
      logger.error('Failed to get video info:', error);
      throw new Error(`Failed to get video info: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Generate a secure URL for a video with transformations
   * @param publicId - The public ID of the video
   * @param transformations - Video transformations
   * @returns string
   */
  static generateSecureUrl(publicId: string, transformations: any = {}): string {
    try {
      return cloudinary.url(publicId, {
        resource_type: 'video',
        secure: true,
        ...transformations
      });
    } catch (error) {
      logger.error('Failed to generate secure URL:', error);
      throw new Error(`Failed to generate secure URL: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Validate if a URL is accessible
   * @param url - The URL to validate
   * @returns Promise<boolean>
   */
  static async validateUrl(url: string): Promise<boolean> {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch (error) {
      logger.error('URL validation failed:', error);
      return false;
    }
  }
}

export default CloudinaryService;
