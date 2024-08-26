import axios from "axios";
import { useEffect } from "react";
import { useSession } from "../session";
import { useToast } from "../toast";
import { applications } from "./applications";
import { LoginCredentials, LoginResponse } from "./interfaces";

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
            session.logout();
          }
          return Promise.reject(error);
        }
      );
    } else {
      service.defaults.headers.Authorization = "";
    }

    return () => {
      service.defaults.headers.Authorization = "";
    };
  }, [session.token, session]);

  return {
    login: async (credentials: LoginCredentials) => {
      const response = await service.post<LoginResponse>("/login", {
        ...credentials,
        application: process.env.NEXT_PUBLIC_APP_ID,
      });
      return response.data;
    },
    defaultErrorHandler: (title: string) => {
      return (error: any) => {
        if (error.response === undefined) {
          toast({
            title: "Ocorreu um erro inesperado",
            message: error.message,
            type: "danger",
          });
          return;
        }
        console.log(`${title}\n${error}`);
        toast({ title, message: error.response.data.feedback, type: "danger" });
      };
    },
    applications: applications(service),
  };
}
