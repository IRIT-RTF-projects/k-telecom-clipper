export interface UserLogin {
  login: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    login: string;
  };
}