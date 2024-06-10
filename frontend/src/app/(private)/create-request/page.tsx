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
  ILabel,
  ILabelForInterface,
  IState,
  requestData,
} from "@/requests/request";
import { useContext, useState } from "react";
import LocationPicker, { IPosition } from "@/components/LocationPicker";
import Link from "next/link";
import { UserContext } from "@/store";

const validationSchema = Yup.object({
  title: Yup.string().required("Це поле обов'язкове"),
  description: Yup.string().required("Це поле обов'язкове"),
  refugeeId: Yup.string(),
  label: Yup.string().required("Це поле обов'язкове"),
});

const defaultTheme = createTheme();

const items = [
  { value: ILabel.HUMANITARIAN, label: ILabelForInterface.HUMANITARIAN },
  { value: ILabel.LEGAL, label: ILabelForInterface.LEGAL },
  { value: ILabel.MATERIAL, label: ILabelForInterface.MATERIAL },
  { value: ILabel.PSYCHOLOGICAL, label: ILabelForInterface.PSYCHOLOGICAL },
  { value: ILabel.OTHER, label: ILabelForInterface.OTHER },
];

export default function CreateRequestPage() {
  const [isSubmited, setIsSubmited] = useState(false);
  const { user } = useContext(UserContext);
  const [position, setPosition] = useState<IPosition>({
    lat: 50.5,
    lng: 30.5,
  });
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      refugeeId: user ? user._id : "",
      label: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
        const response = await createRequest({
          ...values,
          state: IState.PENDING,
          location: position,
        } as requestData);
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
      <Container component="main" maxWidth="xs">
        <CssBaseline />{" "}
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {isSubmited ? (
            <>
              <Typography component="h1" variant="h5" mb={4}>
                Вітаю, ви успішно створили запит!
              </Typography>
              <Box mb={4}>
                <Link href="/">Перейти на головну</Link>
              </Box>
            </>
          ) : (
            <>
              <Typography component="h1" variant="h5">
                Створити Запит
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2} sx={{ mb: "46px" }}>
                  <Grid item xs={12}>
                    <FormTextField
                      getFieldProps={getFieldProps}
                      id={"title"}
                      label="Заголовок"
                      error={Boolean(touched.title && errors.title)}
                      helperText={
                        touched.title && errors.title ? errors.title : ""
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormTextField
                      getFieldProps={getFieldProps}
                      id={"description"}
                      label="Опис"
                      error={Boolean(touched.description && errors.description)}
                      helperText={
                        touched.description && errors.description
                          ? errors.description
                          : ""
                      }
                      multiline
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      select
                      label="Тип"
                      {...getFieldProps("label")}
                      error={Boolean(touched.label && errors.label)}
                      helperText={
                        touched.label && errors.label ? errors.label : ""
                      }
                    >
                      {items.map((item) => (
                        <MenuItem key={item.value} value={item.value}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sx={{ height: "300px" }}>
                    <Typography>Місце перебування:</Typography>
                    <LocationPicker
                      position={position}
                      setPosition={setPosition}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mb: 2 }}
                >
                  Створити
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
