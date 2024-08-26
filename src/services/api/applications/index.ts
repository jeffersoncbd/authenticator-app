import { AxiosInstance } from "axios";
import {
  Application,
  NewApplication,
  NewApplicationResponse,
} from "../interfaces";
import { groups } from "./groups";

export function applications(service: AxiosInstance) {
  return {
    list: async () => {
      const response = await service.get<Application[]>("/applications");
      return response.data;
    },
    getById: async (id: string) => {
      const response = await service.get<Application>(`/applications/${id}`);
      return response.data;
    },
    save: async (data: NewApplication) => {
      const response = await service.post<NewApplicationResponse>(
        "/applications",
        data
      );
      return response.data;
    },
    groups: groups(service),
  };
}
