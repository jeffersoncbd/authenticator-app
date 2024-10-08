import { AxiosInstance } from "axios";
import { BasicResponse, NewUser, User } from "../interfaces";

export function users(service: AxiosInstance) {
  return {
    list: async (applicationId: string) => {
      const response = await service.get<User[]>(
        `/applications/${applicationId}/users`
      );
      return response.data;
    },
    save: async (applicationId: string, data: NewUser) => {
      const response = await service.post<BasicResponse>(
        `/applications/${applicationId}/users`,
        data
      );
      return response.data;
    },
  };
}
