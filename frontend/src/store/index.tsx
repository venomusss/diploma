import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { RegistrationData, UserRole } from "@/requests/auth";

export interface UserContextData {
  _id?: string;
  name: string;
  email: string;
  role: UserRole;
}

interface UserProviderProps {
  children: ReactNode;
}

interface UserState {
  user: UserContextData | null;
  addUser: (newUser: UserContextData) => void;
  removeUser: () => void;
}

const initialState = {
  user: null,
  addUser: () => {},
  removeUser: () => {},
};

export const UserContext = createContext<UserState>(initialState);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<UserContextData | null>(null);

  const addUser = (newUser: UserContextData) => {
    setUser(newUser);
  };

  const removeUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, addUser, removeUser }}>
      {children}
    </UserContext.Provider>
  );
};
