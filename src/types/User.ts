export type UserRole = "user" | "admin" | "superadmin";

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  patronymic: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}
