import { AxiosInstance } from "axios";
import { Permission } from "../interfaces";

export function permissions(service: AxiosInstance) {
  return {
    add: async (
      applicationId: string,
      groupId: string,
      newPermission: Permission
    ) => {
      const response = await service.post<void>(
        `/applications/${applicationId}/groups/${groupId}/permissions`,
        newPermission
      );
      return response.data;
    },
  };
}
