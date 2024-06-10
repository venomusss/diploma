"use client";

import { ReportDetails } from "@/components/ReportDetails";
import { ReportDetailsData, getSingleReport } from "@/requests/reports";
import {
  Box,
  Button,
  CssBaseline,
  Grid,
  Paper,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import LocationPicker, { IPosition } from "@/components/LocationPicker";
import { Form, FormikProvider, useFormik } from "formik";
import Link from "next/link";
import { FormTextField } from "@/components/FormTextField";
import * as Yup from "yup";
import { UserContext } from "@/store";
import { editProfile } from "@/requests/profile";

const validationSchema = Yup.object({
  name: Yup.string().required("Це поле обов'язкове"),
  email: Yup.string()
    .email(`Не валідна адреса пошти`)
    .required("Це поле обов'язкове"),
  phoneNumber: Yup.string().required("Це поле обов'язкове"),
});

const defaultTheme = createTheme();

export default function ReportPage({ params }: { params: { id: string } }) {
  const decoded = JSON.parse(decodeURIComponent(params.id));
  const { user } = useContext(UserContext);

  const [isSubmited, setIsSubmited] = useState(false);
  const [position, setPosition] = useState<IPosition>({
    lat: decoded.location.lat,
    lng: decoded.location.lng,
  });

  const formik = useFormik({
    initialValues: {
      name: decoded.name,
      email: decoded.email,
      phoneNumber: decoded.phoneNumber,
      id: user?._id,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await editProfile({
          ...values,
          location: position,
        });
        setIsSubmited(true);
      } catch (error) {
        console.log("error", error);
      }
    },
  });
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        sx={{ minHeight: "calc( 100vh -  60px )" }}
      >
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          sx={{ display: "flex" }}
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: "auto",
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            {" "}
            {isSubmited ? (
              <>
                <Typography component="h1" variant="h5" mb={4}>
                  Вітаю, ви успішно оновили профіль!
                </Typography>
                <Box mb={4}>
                  <Link href={`/profile/${user?._id}`}>
                    Перейти на сторінку профілю
                  </Link>
                </Box>
              </>
            ) : (
              <>
                <Typography component="h1" variant="h5" mb={4}>
                  Редагування профілю
                </Typography>
                <FormikProvider value={formik}>
                  <Form onSubmit={handleSubmit} style={{ width: "100%" }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "32px",
                        width: "100%",
                      }}
                    >
                      <FormTextField
                        getFieldProps={getFieldProps}
                        id={"name"}
                        label="Ім'я"
                        error={Boolean(touched.name && errors.name)}
                        helperText={
                          touched.name && errors.name ? errors.name : ""
                        }
                      />
                      <FormTextField
                        getFieldProps={getFieldProps}
                        id={"email"}
                        label="Пошта"
                        error={Boolean(touched.email && errors.email)}
                        helperText={
                          touched.email && errors.email ? errors.email : ""
                        }
                      />
                      <FormTextField
                        getFieldProps={getFieldProps}
                        id={"phoneNumber"}
                        label="Номер телефону"
                        error={Boolean(
                          touched.phoneNumber && errors.phoneNumber
                        )}
                        helperText={
                          touched.phoneNumber && errors.phoneNumber
                            ? errors.phoneNumber
                            : ""
                        }
                      />
                      <Box sx={{ height: "300px", width: "100%" }}>
                        <Typography>Місце перебування:</Typography>
                        <LocationPicker
                          position={position}
                          setPosition={setPosition}
                        />
                      </Box>
                      <Button
                        disabled={isSubmitting}
                        variant="contained"
                        type="submit"
                      >
                        Редагувати
                      </Button>
                      <Box mb={4} sx={{ mx: "auto" }}>
                        <Link href={`/profile/${user?._id}`}>
                          Повернутися на сторінку профілю
                        </Link>
                      </Box>
                    </Box>
                  </Form>
                </FormikProvider>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
