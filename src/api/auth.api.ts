import { api } from "./axios";
import type { User } from "../types/User";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

export const authApi = {
  /**
   * Логин
   */
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>(
      "/api/v1/users/login",
      data
    );

    const { access_token, refresh_token } = response.data;

    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);

    return response.data;
  },

  /**
   * Текущий пользователь
   */
  async getMe(): Promise<User> {
    const response = await api.get<User>("/api/v1/users/me");
    return response.data;
  },

  /**
   * Logout (клиентский)
   */
  logout(): void {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  },
};
