export interface Stream {
  id: string;
  address: string;
  entrance: string;
  rtspUrl: string;
  userCount: number;
  isOnline: boolean;
  lastActive?: string;
  assignedUsers?: string[];
}

export interface User {
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

export interface NewStreamForm {
  rtspUrl: string;
  cameraAddress: string;
  selectedUsers: string[];
}

export interface UserForm {
  login: string;
  password: string;
  email: string;
}

export interface DeleteModalState {
  isOpen: boolean;
  stream: Stream | null;
  user: User | null;
}

export interface UserManagementState {
  selectedUser: User | null;
  userStreamAssignments: { [userId: string]: string[] };
}

export interface BackendUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  patronymic: string | null;
  role: 'admin' | 'user';
  created_at: string;
  updated_at: string;
}