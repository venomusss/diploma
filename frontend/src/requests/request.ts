import axios from "axios";
import { RegistrationData } from "./auth";
import { IPosition } from "@/components/LocationPicker";

export enum IState {
  PENDING = "PENDING",
  CANCELED = "CANCELED",
  IN_WORK = "IN_WORK",
  COMPLETED = "COMPLETED",
}

export enum ILabel {
  HUMANITARIAN = "HUMANITARIAN",
  LEGAL = "LEGAL",
  MATERIAL = "MATERIAL",
  PSYCHOLOGICAL = "PSYCHOLOGICAL",
  OTHER = "OTHER",
}

export enum ILabelForInterface {
  HUMANITARIAN = "Гуманітарна допомога",
  LEGAL = "Юридична допомога",
  MATERIAL = "Матеріальна допомога",
  PSYCHOLOGICAL = "Психологічна допомога",
  OTHER = "Інша допомога",
}

export enum IStateForInterface {
  PENDING = "Очікує на допомогу",
  CANCELED = "Відмінено",
  IN_WORK = "Виконується",
  COMPLETED = "Виконано",
}
export interface FilterData {
  label: string;
  state: string;
  search: string;
}

export interface requestData {
  title: string;
  description: string;
  refugeeId?: RegistrationData;
  volunteerId?: RegistrationData;
  location?: IPosition;
  state: IState;
  label: ILabel;
}

export interface responseRequestData extends requestData {
  _id: string;
}

export interface updateRequestData {
  _id: string;
  title: string;
  description: string;
  refugeeId?: RegistrationData;
  volunteerId?: string;
  location?: IPosition;
  state: IState;
  label: ILabel;
}

export const createRequest = async (data: requestData) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/requests/create`,
      data
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getRefugeeRequestsById = async (
  id: string,
  data?: FilterData
): Promise<responseRequestData[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/requests/refugee/${id}`,
      { params: data }
    );
    return response.data.requests;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteRequestsById = async (id: string) => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/requests/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getSingleRequestsById = async (id: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/requests/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateRequestById = async (
  id: string,
  data: updateRequestData
) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/requests/${id}`,
      data
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllRequests = async (data: FilterData) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/requests`,
      {
        params: data,
      }
    );
    return response.data.requests;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
