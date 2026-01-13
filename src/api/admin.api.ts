import { api } from './axios';
import type { Stream, User, BackendUser, NewStreamForm, UserForm } from '../types/Admin';

/* ---------- MAPPERS ---------- */
const mapBackendUserToUser = (u: BackendUser): User => ({
  id: u.id,
  login: `${u.first_name} ${u.last_name}`.trim() || u.email,
  email: u.email,
  role: u.role,
  registrationDate: u.created_at,
  lastLogin: u.updated_at,
  streamCount: 0,         
  isActive: true,          
  assignedStreams: [],     
});

export const adminApi = {
  /* ---------- Streams ---------- */
  async getStreams(): Promise<Stream[]> {
    const res = await api.get('/api/v1/admin/streams');
    return Array.isArray(res.data) ? res.data : [];
  },

  async createStream(payload: NewStreamForm): Promise<Stream> {
    const res = await api.post('/api/v1/admin/streams', {
      url: payload.rtspUrl,              // ⚠️ важно
      address: payload.cameraAddress,
      user_ids: payload.selectedUsers,
    });
    return res.data;
  },

  async updateStream(id: string, payload: Partial<NewStreamForm>): Promise<Stream> {
    const res = await api.put(`/api/v1/admin/streams/${id}`, payload);
    return res.data;
  },

  async deleteStream(id: string): Promise<void> {
    await api.delete(`/api/v1/admin/streams/${id}`);
  },

  /* ---------- Users ---------- */
  async getUsers(): Promise<User[]> {
    const res = await api.get<BackendUser[]>('/api/v1/admin/users');
    return Array.isArray(res.data)
      ? res.data.map(mapBackendUserToUser)
      : [];
  },

  async createUser(payload: UserForm): Promise<User> {
    const res = await api.post<BackendUser>('/api/v1/admin/users', payload);
    return mapBackendUserToUser(res.data);
  },

  async updateUser(id: string, payload: Partial<User>): Promise<User> {
    const res = await api.put<BackendUser>(`/api/v1/admin/users/${id}`, payload);
    return mapBackendUserToUser(res.data);
  },

  async deleteUser(id: string): Promise<void> {
    await api.delete(`/api/v1/admin/users/${id}`);
  },

  /* ---------- Assignments (временно) ---------- */
  async assignStreamsToUser(userId: string, streamIds: string[]): Promise<void> {
    await api.post(`/api/v1/admin/users/${userId}/streams`, {
      stream_ids: streamIds,
    });
  },
};
