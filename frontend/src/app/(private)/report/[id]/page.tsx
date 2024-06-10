"use client";

import { ReportDetails } from "@/components/ReportDetails";
import { ReportDetailsData, getSingleReport } from "@/requests/reports";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Form, FormikProvider, FormikValues, useFormik } from "formik";

const validationSchema = Yup.object({
  name: Yup.string().required("Це поле обов'язкове"),
  email: Yup.string()
    .email(`Не валідна адреса пошти`)
    .required("Це поле обов'язкове"),
  password: Yup.string().required("Це поле обов'язкове"),
  phoneNumber: Yup.string().required("Це поле обов'язкове"),
});

export default function ReportPage({ params }: { params: { id: string } }) {
  const [report, setReport] = useState<ReportDetailsData | null>(null);

  const fetchRequest = async () => {
    const response = await getSingleReport(params.id);
    setReport(response);
  };

  useEffect(() => {
    fetchRequest();
  }, [params.id]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        px: 3,
        my: 3,
      }}
    >
      {report && <ReportDetails data={report} />}
    </Box>
  );
}
