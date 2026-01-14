import { api } from './axios';
import type { User } from '../types/User';
import type { AdminUser, Stream, NewStreamForm, UserForm } from '../types/Admin';
import { mapUserToAdminUser } from '../mappers/admin.mappers';

export const adminApi = {
  /* ---------- USERS ---------- */
  async getUsers(): Promise<AdminUser[]> {
    const res = await api.get<User[]>('/api/v1/admin/users');
    return res.data.map(mapUserToAdminUser);
  },

  async createUser(payload: UserForm): Promise<AdminUser> {
    const res = await api.post<User>('/api/v1/admin/users', payload);
    return mapUserToAdminUser(res.data);
  },

  async updateUser(id: string, payload: Partial<UserForm>): Promise<AdminUser> {
    const res = await api.put<User>(`/api/v1/admin/users/${id}`, payload);
    return mapUserToAdminUser(res.data);
  },

  async deleteUser(id: string): Promise<void> {
    await api.delete(`/api/v1/admin/users/${id}`);
  },

  /* ---------- STREAMS ---------- */
  async getStreams(): Promise<Stream[]> {
    const res = await api.get('/api/v1/admin/streams');
    return res.data;
  },

  async createStream(payload: NewStreamForm): Promise<Stream> {
    const res = await api.post('/api/v1/admin/streams', {
      url: payload.url,
      description: payload.description,
    });
    return res.data;
  },

  async deleteStream(id: number): Promise<void> {
    await api.delete(`/api/v1/admin/streams/${id}`);
  },

  async assignStreamsToUser(userId: string, streamIds: string[]): Promise<void> {
    await api.post(`/api/v1/admin/users/${userId}/streams`, {
      stream_ids: streamIds,
    });
  },
};
