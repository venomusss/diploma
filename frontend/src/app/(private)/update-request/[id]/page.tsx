"use client";

import * as Yup from "yup";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik } from "formik";
import { FormTextField } from "@/components/FormTextField";
import { MenuItem, TextareaAutosize } from "@mui/material";
import {
  createRequest,
  getSingleRequestsById,
  ILabel,
  ILabelForInterface,
  IState,
  requestData,
  responseRequestData,
  updateRequestById,
  updateRequestData,
} from "@/requests/request";
import { useContext, useEffect, useState } from "react";
import LocationPicker, { IPosition } from "@/components/LocationPicker";
import Link from "next/link";
import { UserContext } from "@/store";
import UpdateRequestForm from "@/components/UpdateRequestForm";

export default function UpdateRequestPage({
  params,
}: {
  params: { id: string };
}) {
  const [request, setRequest] = useState<responseRequestData | null>(null);

  const fetchRequest = async () => {
    const response = await getSingleRequestsById(params.id);
    setRequest(response.request);
  };

  useEffect(() => {
    fetchRequest();
  }, [params.id]);

  return request ? <UpdateRequestForm request={request} /> : null;
}
