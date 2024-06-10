import axios from "axios";
import { RegistrationData } from "./auth";
import { requestData, responseRequestData } from "./request";

export interface ReportData {
  volunteer?: string;
  title: string;
  description: string;
  request: string;
  images?: string[];
}

export interface responseReportData extends ReportData {
  _id: string;
}

export interface ReportDetailsData {
  volunteer: RegistrationData;
  title: string;
  description: string;
  request: string;
  images?: string[];
}

export const createReport = async (data: ReportData) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/reports/create`,
      data
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getReports = async (id: string): Promise<responseReportData[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/reports/${id}`
    );
    return response.data.reports;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getSingleReport = async (
  id: string
): Promise<ReportDetailsData> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/reports/single/${id}`
    );
    return response.data.reports;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
