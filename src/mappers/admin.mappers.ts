// src/mappers/admin.mappers.ts
import type { User } from '../types/User';
import type { AdminUser, Stream } from '../types/Admin';

/* ===================== USER ===================== */

export const mapUserToAdminUser = (u: User): AdminUser => ({
  id: String(u.id),

  login: `${u.first_name} ${u.last_name}`.trim() || u.email,
  email: u.email,
  role: u.role,

  registrationDate: u.created_at,
  lastLogin: u.updated_at,

  streamCount: 0,
  isActive: true,

  // по умолчанию пустой список; он будет заполнен при загрузке потоков
  assignedStreams: [],
});

/* ===================== STREAM ===================== */

/**
 * Нормализуем входной Partial<Stream> в Stream,
 * соблюдая реальные поля из types/Admin.Stream
 */
export const normalizeStream = (s: Partial<Stream>): Stream => ({
  id: s.id ?? 0,
  url: s.url ?? '',
  description: s.description ?? '',
  created_at: s.created_at ?? '',
  updated_at: s.updated_at ?? '',
});
