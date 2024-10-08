import { AxiosInstance } from "axios";
import { User } from "../interfaces";

export function users(service: AxiosInstance) {
  return {
    list: async (applicationId: string) => {
      const response = await service.get<User[]>(
        `/applications/${applicationId}/users`
      );
      return response.data;
    },
  };
}
