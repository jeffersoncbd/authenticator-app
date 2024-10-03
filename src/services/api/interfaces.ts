export interface BasicResponse {
  feedback: string;
}
export interface LoginResponse extends BasicResponse {
  token: string;
}
export interface BasicCreation extends BasicResponse {
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

export interface NewGroup {
  name: string;
}
export interface Group extends NewGroup {
  id: string;
  permissions: Record<string, number>;
}
