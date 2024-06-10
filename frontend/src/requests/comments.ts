import axios from "axios";
import { responseRequestData } from "./request";

export interface commentData {
  content: string;
  commentator: responseRequestData | string;
  target: responseRequestData | string;
}

export interface responseCommentData extends commentData {
  _id: string;
  updatedAt: string;
}

export const createComment = async (data: commentData) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/comments/create`,
      data
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserComments = async (
  id: string
): Promise<responseCommentData[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/comments/${id}`
    );
    return response.data.comments;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
