export interface BasicResponse {
  feedback: string;
}
export interface LoginResponse extends BasicResponse {
  token: string;
}
export interface NewApplicationResponse extends BasicResponse {
  id: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface NewApplication {
  name: string;
}
export interface Application extends NewApplication {
  id: string;
}
