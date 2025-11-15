import { Request, Response } from 'express';
import prisma from '../config/database';
import { AuthRequest } from '../types/auth.types';
import { asyncHandler } from '../middlewares/error.middleware';

export class NotificationController {
  // GET /notifications
  static getNotifications = asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId = req.userId!;
    const { limit = 20, offset = 0, type, unreadOnly = false } = req.query;

    const where: any = { userId };
    if (type) where.type = type;
    if (unreadOnly === 'true') where.isRead = false;

    const notifications = await prisma.notification.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: parseInt(limit as string),
      skip: parseInt(offset as string)
    });

    const total = await prisma.notification.count({ where });
    const unreadCount = await prisma.notification.count({
      where: { userId, isRead: false }
    });

    res.status(200).json({
      success: true,
      data: notifications,
      pagination: {
        total,
        pages: Math.ceil(total / parseInt(limit as string)),
        page: Math.floor(parseInt(offset as string) / parseInt(limit as string)) + 1,
        limit: parseInt(limit as string)
      },
      unreadCount
    });
  });

  // PUT /notifications/:id/read
  static markAsRead = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const userId = req.userId!;

    const notification = await prisma.notification.updateMany({
      where: {
        id,
        userId
      },
      data: {
        isRead: true
      }
    });

    if (notification.count === 0) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Notification marked as read'
    });
  });

  // PUT /notifications/read-all
  static markAllAsRead = asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId = req.userId!;

    await prisma.notification.updateMany({
      where: {
        userId,
        isRead: false
      },
      data: {
        isRead: true
      }
    });

    res.status(200).json({
      success: true,
      message: 'All notifications marked as read'
    });
  });

  // DELETE /notifications/:id
  static deleteNotification = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const userId = req.userId!;

    const notification = await prisma.notification.deleteMany({
      where: {
        id,
        userId
      }
    });

    if (notification.count === 0) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Notification deleted'
    });
  });

  // POST /notifications
  static createNotification = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { userId, title, message, type = 'GENERAL', data } = req.body;

    const notification = await prisma.notification.create({
      data: {
        userId,
        title,
        message,
        type,
        data: data ? JSON.parse(data) : null
      }
    });

    res.status(201).json({
      success: true,
      data: notification
    });
  });

  // GET /notifications/stats
  static getNotificationStats = asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId = req.userId!;

    const stats = await prisma.notification.groupBy({
      by: ['type', 'isRead'],
      where: { userId },
      _count: { id: true }
    });

    const totalNotifications = await prisma.notification.count({
      where: { userId }
    });

    const unreadNotifications = await prisma.notification.count({
      where: { userId, isRead: false }
    });

    res.status(200).json({
      success: true,
      data: {
        total: totalNotifications,
        unread: unreadNotifications,
        byType: stats.reduce((acc, stat) => {
          const key = `${stat.type}_${stat.isRead ? 'read' : 'unread'}`;
          acc[key] = stat._count.id;
          return acc;
        }, {} as any)
      }
    });
  });
}
