import { AxiosInstance } from "axios";
import { Group } from "../interfaces";

export function groups(service: AxiosInstance) {
  return {
    list: async (applicationId: string) => {
      const response = await service.get<Group[]>(
        `/applications/${applicationId}/groups`
      );
      return response.data;
    },
  };
}
