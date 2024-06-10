"use client";

import {
  Box,
  Button,
  CssBaseline,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import * as Yup from "yup";
import { Form, FormikProvider, FormikValues, useFormik } from "formik";
import { FormTextField } from "@/components/FormTextField";
import { UserRole, registerUser } from "@/requests/auth";
import { useEffect, useState } from "react";
import LocationPicker, { IPosition } from "@/components/LocationPicker";
import Link from "next/link";

const validationSchema = Yup.object({
  name: Yup.string().required("Це поле обов'язкове"),
  email: Yup.string()
    .email(`Не валідна адреса пошти`)
    .required("Це поле обов'язкове"),
  password: Yup.string().required("Це поле обов'язкове"),
  phoneNumber: Yup.string().required("Це поле обов'язкове"),
});

const defaultTheme = createTheme();

export default function RegisterPage() {
  const [isSubmited, setIsSubmited] = useState(false);
  const [role, setRole] = useState<UserRole>(UserRole.REFUGEE);
  const [position, setPosition] = useState<IPosition>({
    lat: 50.5,
    lng: 30.5,
  });

  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as UserRole);
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await registerUser({
          ...values,
          role: role,
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
                  Вітаю, ви успішно зареєструвались!
                </Typography>
                <Box mb={4}>
                  <Link href="/login">Перейти на сторінку Входу</Link>
                </Box>
              </>
            ) : (
              <>
                <Typography component="h1" variant="h5" mb={4}>
                  Реєстрація
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
                      <FormControl fullWidth>
                        <InputLabel id="select-label">Хто ви</InputLabel>
                        <Select
                          labelId="select-label"
                          value={role}
                          label="Хто ви"
                          placeholder="Хто ви"
                          onChange={handleChange}
                        >
                          <MenuItem value={UserRole.REFUGEE}>
                            Я Переселенець
                          </MenuItem>
                          <MenuItem value={UserRole.VOLUNTEER}>
                            Я Волонтер
                          </MenuItem>
                        </Select>
                      </FormControl>
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
                        Зареєструватися
                      </Button>
                      <Box mb={4} sx={{ mx: "auto" }}>
                        <Link href="/login">Увійти в існуючий акаунт</Link>
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
