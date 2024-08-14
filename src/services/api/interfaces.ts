export interface Credentials {
  email: string;
  password: string;
}
export interface LoginResponse {
  feedback: string;
  token: string;
}

export interface Application {
  id: string;
  name: string;
  keys: string[];
}
