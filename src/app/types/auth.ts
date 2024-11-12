export interface User {
  id: string;
  username: string;
  email: string;
  image: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface TokenResponse {
  token: string;
  tokenType: string;
  expiresIn: number;
  refreshToken: string;
}
