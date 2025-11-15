import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';

interface UseApiOptions {
  immediate?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useApi<T = any>(
  apiCall: () => Promise<any>,
  options: UseApiOptions = {}
): UseApiState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { immediate = true, onSuccess, onError } = options;

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await apiCall();
      setData(result.data);
      onSuccess?.(result.data);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
      setError(errorMessage);
      onError?.(err);
    } finally {
      setLoading(false);
    }
  }, [apiCall, onSuccess, onError]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate, execute]);

  return {
    data,
    loading,
    error,
    refetch: execute,
  };
}

// Specific hooks for common API calls
export function useAuth() {
  const login = async (credentials: { email: string; password: string }) => {
    const response = await api.auth.login(credentials);
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken);
    }
    return response.data;
  };

  const logout = async () => {
    try {
      await api.auth.logout();
    } finally {
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
    }
  };

  const register = async (userData: { name: string; email: string; password: string; role: string }) => {
    const response = await api.auth.register(userData);
    return response.data;
  };

  const getProfile = () => useApi(() => api.user.getProfile());
  const getDashboard = () => useApi(() => api.user.getDashboard());

  return {
    login,
    logout,
    register,
    getProfile,
    getDashboard,
  };
}

export function useCourses() {
  const getAll = () => useApi(() => api.course.getAll());
  const getById = (id: string) => useApi(() => api.course.getById(id));

  const enroll = async (id: string) => {
    const response = await api.course.enroll(id);
    return response.data;
  };

  return {
    getAll,
    getById,
    enroll,
  };
}

export function useChallenges() {
  const getAll = () => useApi(() => api.challenge.getAll());
  const getById = (id: string) => useApi(() => api.challenge.getById(id));
  const getLeaderboard = (id: string) => useApi(() => api.challenge.getLeaderboard(id));

  const submit = async (id: string, data: any) => {
    const response = await api.challenge.submit(id, data);
    return response.data;
  };

  return {
    getAll,
    getById,
    getLeaderboard,
    submit,
  };
}

export function useQuests() {
  const getAll = () => useApi(() => api.quest.getAll());
  const getById = (id: string) => useApi(() => api.quest.getById(id));

  const start = async (id: string) => {
    const response = await api.quest.start(id);
    return response.data;
  };

  const complete = async (id: string, data: any) => {
    const response = await api.quest.complete(id, data);
    return response.data;
  };

  return {
    getAll,
    getById,
    start,
    complete,
  };
}

export function useSources() {
  const getAll = () => useApi(() => api.source.getAll());
  const getById = (id: string) => useApi(() => api.source.getById(id));

  const create = async (data: any) => {
    const response = await api.source.create(data);
    return response.data;
  };

  const update = async (id: string, data: any) => {
    const response = await api.source.update(id, data);
    return response.data;
  };

  const deleteSource = async (id: string) => {
    const response = await api.source.delete(id);
    return response.data;
  };

  const upload = async (data: FormData) => {
    const response = await api.source.upload(data);
    return response.data;
  };

  return {
    getAll,
    getById,
    create,
    update,
    delete: deleteSource,
    upload,
  };
}

export function useNotifications() {
  const getAll = () => useApi(() => api.notification.getAll());

  const markAsRead = async (id: string) => {
    const response = await api.notification.markAsRead(id);
    return response.data;
  };

  const markAllAsRead = async () => {
    const response = await api.notification.markAllAsRead();
    return response.data;
  };

  return {
    getAll,
    markAsRead,
    markAllAsRead,
  };
}

export function useUpload() {
  const uploadImage = async (data: FormData) => {
    const response = await api.upload.image(data);
    return response.data;
  };

  const uploadVideo = async (data: FormData) => {
    const response = await api.upload.video(data);
    return response.data;
  };

  const uploadDocument = async (data: FormData) => {
    const response = await api.upload.document(data);
    return response.data;
  };

  return {
    uploadImage,
    uploadVideo,
    uploadDocument,
  };
}
