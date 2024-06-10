"use client";

import * as React from "react";
import * as Yup from "yup";
import { Form, FormikProvider, FormikValues, useFormik } from "formik";
import { FormTextField } from "@/components/FormTextField";
import { UserRole, loginUser } from "@/requests/auth";
import { useContext, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { UserContext, UserContextData } from "@/store";
import Link from "next/link";

const validationSchema = Yup.object({
  email: Yup.string()
    .email(`Це поле обов'язкове`)
    .required("Не валідна адреса пошти"),
  password: Yup.string().required("Це поле обов'язкове"),
});

const defaultTheme = createTheme();

export default function LoginPage() {
  const { addUser, user } = useContext(UserContext);
  const [isSubmited, setIsSubmited] = useState(false);
  const handleAddUser = (user: UserContextData) => {
    addUser(user);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
        const response = await loginUser(values);
        handleAddUser(response.data.user);

        setIsSubmited(true);
        setSubmitting(false);
      } catch (error) {
        setSubmitting(false);
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
            {isSubmited ? (
              <>
                <Typography component="h1" variant="h5" mb={4}>
                  Вітаю, ви успішно увійшли в свій акаунт!
                </Typography>
                <Box mb={4}>
                  <Link href="/">Перейти на головну</Link>
                </Box>
              </>
            ) : (
              <>
                <Typography component="h1" variant="h5" mb={4}>
                  Вхід
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
                        id={"email"}
                        label="Пошта"
                        error={Boolean(touched.email && errors.email)}
                        helperText={
                          touched.email && errors.email ? errors.email : ""
                        }
                      />
                      <FormTextField
                        getFieldProps={getFieldProps}
                        id={"password"}
                        label="Пароль"
                        error={Boolean(touched.password && errors.password)}
                        helperText={
                          touched.password && errors.password
                            ? errors.password
                            : ""
                        }
                      />
                      <Button
                        disabled={isSubmitting}
                        variant="contained"
                        type="submit"
                      >
                        Увійти
                      </Button>
                      <Box sx={{ mx: "auto" }}>
                        <Link href="/register">
                          Немає акаунту? Зареєструйся!
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
