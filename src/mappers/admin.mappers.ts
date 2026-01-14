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
  assignedStreams: [],
});

/* ===================== STREAM ===================== */

export const normalizeStream = (s: Partial<Stream>): Stream => ({
  id: String(s.id ?? ''),
  address: s.address ?? '',
  entrance: s.entrance ?? '',
  rtspUrl: s.rtspUrl ?? '',

  userCount: s.userCount ?? 0,
  isOnline: s.isOnline ?? false,
  lastActive: s.lastActive,

  assignedUsers: Array.isArray(s.assignedUsers) ? s.assignedUsers : [],
});
