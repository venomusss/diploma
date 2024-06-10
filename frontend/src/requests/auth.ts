import { IPosition } from "@/components/LocationPicker";
import axios from "axios";

export enum UserRole {
  REFUGEE = "REFUGEE",
  VOLUNTEER = "VOLUNTEER",
  ADMIN = "ADMIN",
}

export enum UserRoleForInterface {
  REFUGEE = "Переселенець",
  VOLUNTEER = "Волонтер",
  ADMIN = "Адмін",
}

export interface RegistrationData {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  phoneNumber: string;
  location?: IPosition;
}

interface LoginData {
  email: string;
  password: string;
}

export const registerUser = async (data: RegistrationData) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/auth/register`,
      data
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const loginUser = async (data: LoginData) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/auth/login`,
      data
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteUser = async (id: string) => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/users/${id}`
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
