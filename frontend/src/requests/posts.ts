import axios from "axios";
import { RegistrationData } from "./auth";
import { IPosition } from "@/components/LocationPicker";
import { FilterData } from "./request";

export enum IPostState {
  OPENED = "OPENED",
  CANCELED = "CANCELED",
  CLOSED = "CLOSED",
}

export enum IPostLabel {
  HUMANITARIAN = "HUMANITARIAN",
  LEGAL = "LEGAL",
  MATERIAL = "MATERIAL",
  PSYCHOLOGICAL = "PSYCHOLOGICAL",
  OTHER = "OTHER",
}

export enum IPostLabelForInterface {
  HUMANITARIAN = "Гуманітарна допомога",
  LEGAL = "Юридична допомога",
  MATERIAL = "Матеріальна допомога",
  PSYCHOLOGICAL = "Психологічна допомога",
  OTHER = "Інша допомога",
}

export enum IPostStateForInterface {
  OPENED = "Відкрито",
  CANCELED = "Відмінено",
  CLOSED = "Закрито",
}

export interface postData {
  title: string;
  description: string;
  refugeeIds: string[];
  volunteerId?: RegistrationData;
  location?: IPosition;
  state: IPostState;
  label: IPostLabel;
  maxNumberOfRefugees: number;
}

export interface responsePostData extends postData {
  _id: string;
}

export const createPost = async (data: postData) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/posts/create`,
      data
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllPosts = async (data: FilterData) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/posts`,
      {
        params: data,
      }
    );
    return response.data.posts;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getSinglePostById = async (id: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/posts/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updatePostById = async (id: string, data: postData) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/posts/${id}`,
      data
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserPosts = async (
  id: string,
  data?: FilterData
): Promise<responsePostData[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/posts/volonteer/${id}`,
      { params: data }
    );
    return response.data.posts;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deletePostById = async (id: string) => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/posts/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
