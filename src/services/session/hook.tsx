import { useContext } from "react";
import { Session } from ".";

export function useSession() {
  return useContext(Session.Context)
}
