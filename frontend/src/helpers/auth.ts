import { UserContextData } from "@/store";
import { useContext } from "react";

export const isAuthencificated = (user: UserContextData | null) => {
  return user !== null;
};
