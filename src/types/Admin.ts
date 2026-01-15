/* ===================== STREAM ===================== */

export interface Stream {
  id: number;
  url: string;
  description: string;
  created_at: string;
  updated_at: string;
}


/* ===================== USER (ADMIN UI) ===================== */
export interface AdminUser {
  id: string;

  login: string;
  email: string;
  role: 'admin' | 'user';

  registrationDate: string;
  lastLogin: string;

  streamCount: number;
  isActive: boolean;

  assignedStreams: string[];
}

export type StreamWithUsers = Stream & {
  users: AdminUser[];
};
/* ===================== FORMS ===================== */

export interface NewStreamForm {
  url: string;
  description: string;
  userIds: number[];
}


export interface UserForm {
  login: string;
  password: string;
  email: string;
}
