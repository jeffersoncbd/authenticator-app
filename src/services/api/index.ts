import axios from "axios";
import { useEffect } from "react";
import { useSession } from "../session";
import { useToast } from "../toast";
import { Application, Credentials, LoginResponse } from "./interfaces";

const service = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export function useApiService() {
  const session = useSession();
  const toast = useToast();

  useEffect(() => {
    if (session.token) {
      service.defaults.headers.Authorization = `Bearer ${session.token}`;
      service.interceptors.response.use(
        (response) => response,
        (error) => {
          if (
            error.response.status === 401 &&
            error.response.data.feedback ===
              "token has invalid claims: token is expired"
          ) {
            toast({
              title: "Sessão expirada, faça login novamente",
              type: "danger",
            });
            // session.logout();
            return Promise.resolve();
          } else {
            return Promise.reject(error);
          }
        }
      );
    } else {
      service.defaults.headers.Authorization = "";
    }

    return () => {
      service.defaults.headers.Authorization = "";
    };
  }, [session.token, toast, session]);

  return {
    login: async (credentials: Credentials) => {
      const response = await service.post<LoginResponse>("/login", {
        ...credentials,
        application: process.env.NEXT_PUBLIC_APP_ID,
      });
      return response.data;
    },
    applications: async () => {
      const response = await service.get<Application[]>("/applications");
      return response.data;
    },
  };
}
