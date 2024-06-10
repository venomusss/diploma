import { IPosition } from "@/components/LocationPicker";
import axios from "axios";

export interface EditProfileData {
  email: string;
  name: string;
  phoneNumber: string;
  location: IPosition;
}

export const getUserById = async (id: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/users/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editProfile = async (data: EditProfileData) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/profile/update`,
      data
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
