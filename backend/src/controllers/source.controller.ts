import { Request, Response } from 'express';
import { AuthRequest } from '../types/auth.types';
import prisma from '../config/database';
import { v4 as uuidv4 } from 'uuid';

export interface SourceData {
  id: string;
  title: string;
  url: string;
  type: 'youtube' | 'document' | 'website' | 'video' | 'other';
  description?: string;
  duration?: number;
  isRequired?: boolean;
  order: number;
}

export class SourceController {
  // GET /api/sources/:courseId
  static async getCourseSources(req: AuthRequest, res: Response) {
    try {
      const { courseId } = req.params;

      const course = await prisma.course.findFirst({
        where: {
          id: courseId,
          instructorId: req.userId!
        },
        select: {
          id: true,
          title: true,
          sources: true
        }
      });

      if (!course) {
        return res.status(404).json({
          success: false,
          message: 'Course not found or no permission'
        });
      }

      const sources = course.sources as SourceData[] || [];

      res.status(200).json({
        success: true,
        data: {
          courseId: course.id,
          courseTitle: course.title,
          sources
        }
      });
    } catch (error) {
      console.error('Get course sources error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get course sources'
      });
    }
  }

  // POST /api/sources/:courseId
  static async addCourseSource(req: AuthRequest, res: Response) {
    try {
      const { courseId } = req.params;
      const { title, url, type, description, duration, isRequired } = req.body;

      // Validate required fields
      if (!title || !url || !type) {
        return res.status(400).json({
          success: false,
          message: 'title, url, and type are required'
        });
      }

      // Validate URL format
      try {
        new URL(url);
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: 'Invalid URL format'
        });
      }

      // Validate type
      const validTypes = ['youtube', 'document', 'website', 'video', 'other'];
      if (!validTypes.includes(type)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid source type'
        });
      }

      // Check if course exists and user has permission
      const course = await prisma.course.findFirst({
        where: {
          id: courseId,
          instructorId: req.userId!
        },
        select: {
          id: true,
          sources: true
        }
      });

      if (!course) {
        return res.status(404).json({
          success: false,
          message: 'Course not found or no permission'
        });
      }

      // Get existing sources
      const existingSources = (course.sources as SourceData[]) || [];
      
      // Create new source
      const newSource: SourceData = {
        id: uuidv4(),
        title,
        url,
        type,
        description,
        duration,
        isRequired: isRequired || false,
        order: existingSources.length
      };

      // Add new source to existing sources
      const updatedSources = [...existingSources, newSource];

      // Update course with new sources
      const updatedCourse = await prisma.course.update({
        where: { id: courseId },
        data: { sources: updatedSources },
        select: {
          id: true,
          title: true,
          sources: true
        }
      });

      res.status(201).json({
        success: true,
        message: 'Source added successfully',
        data: {
          source: newSource,
          course: updatedCourse
        }
      });
    } catch (error) {
      console.error('Add course source error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to add course source'
      });
    }
  }

  // PUT /api/sources/:courseId/:sourceId
  static async updateCourseSource(req: AuthRequest, res: Response) {
    try {
      const { courseId, sourceId } = req.params;
      const { title, url, type, description, duration, isRequired, order } = req.body;

      // Check if course exists and user has permission
      const course = await prisma.course.findFirst({
        where: {
          id: courseId,
          instructorId: req.userId!
        },
        select: {
          id: true,
          sources: true
        }
      });

      if (!course) {
        return res.status(404).json({
          success: false,
          message: 'Course not found or no permission'
        });
      }

      const sources = (course.sources as SourceData[]) || [];
      const sourceIndex = sources.findIndex(source => source.id === sourceId);

      if (sourceIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'Source not found'
        });
      }

      // Update source
      const updatedSource: SourceData = {
        ...sources[sourceIndex],
        ...(title && { title }),
        ...(url && { url }),
        ...(type && { type }),
        ...(description !== undefined && { description }),
        ...(duration !== undefined && { duration }),
        ...(isRequired !== undefined && { isRequired }),
        ...(order !== undefined && { order })
      };

      // Validate URL if provided
      if (url) {
        try {
          new URL(url);
        } catch (error) {
          return res.status(400).json({
            success: false,
            message: 'Invalid URL format'
          });
        }
      }

      // Validate type if provided
      if (type) {
        const validTypes = ['youtube', 'document', 'website', 'video', 'other'];
        if (!validTypes.includes(type)) {
          return res.status(400).json({
            success: false,
            message: 'Invalid source type'
          });
        }
      }

      sources[sourceIndex] = updatedSource;

      // Update course with modified sources
      const updatedCourse = await prisma.course.update({
        where: { id: courseId },
        data: { sources },
        select: {
          id: true,
          title: true,
          sources: true
        }
      });

      res.status(200).json({
        success: true,
        message: 'Source updated successfully',
        data: {
          source: updatedSource,
          course: updatedCourse
        }
      });
    } catch (error) {
      console.error('Update course source error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update course source'
      });
    }
  }

  // DELETE /api/sources/:courseId/:sourceId
  static async deleteCourseSource(req: AuthRequest, res: Response) {
    try {
      const { courseId, sourceId } = req.params;

      // Check if course exists and user has permission
      const course = await prisma.course.findFirst({
        where: {
          id: courseId,
          instructorId: req.userId!
        },
        select: {
          id: true,
          sources: true
        }
      });

      if (!course) {
        return res.status(404).json({
          success: false,
          message: 'Course not found or no permission'
        });
      }

      const sources = (course.sources as SourceData[]) || [];
      const sourceIndex = sources.findIndex(source => source.id === sourceId);

      if (sourceIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'Source not found'
        });
      }

      // Remove source from array
      const updatedSources = sources.filter(source => source.id !== sourceId);

      // Update course with modified sources
      const updatedCourse = await prisma.course.update({
        where: { id: courseId },
        data: { sources: updatedSources },
        select: {
          id: true,
          title: true,
          sources: true
        }
      });

      res.status(200).json({
        success: true,
        message: 'Source deleted successfully',
        data: {
          course: updatedCourse
        }
      });
    } catch (error) {
      console.error('Delete course source error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete course source'
      });
    }
  }

  // PUT /api/sources/:courseId/reorder
  static async reorderCourseSources(req: AuthRequest, res: Response) {
    try {
      const { courseId } = req.params;
      const { sourceIds } = req.body; // Array of source IDs in new order

      if (!Array.isArray(sourceIds)) {
        return res.status(400).json({
          success: false,
          message: 'sourceIds must be an array'
        });
      }

      // Check if course exists and user has permission
      const course = await prisma.course.findFirst({
        where: {
          id: courseId,
          instructorId: req.userId!
        },
        select: {
          id: true,
          sources: true
        }
      });

      if (!course) {
        return res.status(404).json({
          success: false,
          message: 'Course not found or no permission'
        });
      }

      const sources = (course.sources as SourceData[]) || [];

      // Reorder sources based on provided order
      const reorderedSources = sourceIds.map((sourceId: string, index: number) => {
        const source = sources.find(s => s.id === sourceId);
        if (source) {
          return { ...source, order: index };
        }
        return null;
      }).filter(Boolean) as SourceData[];

      // Update course with reordered sources
      const updatedCourse = await prisma.course.update({
        where: { id: courseId },
        data: { sources: reorderedSources },
        select: {
          id: true,
          title: true,
          sources: true
        }
      });

      res.status(200).json({
        success: true,
        message: 'Sources reordered successfully',
        data: {
          course: updatedCourse
        }
      });
    } catch (error) {
      console.error('Reorder course sources error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to reorder course sources'
      });
    }
  }
}

export default SourceController;
