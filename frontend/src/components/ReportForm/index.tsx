import React, { useState, ChangeEvent, useEffect, useContext } from "react";
import { Form, FormikProvider, FormikValues, useFormik } from "formik";
import { FormTextField } from "@/components/FormTextField";
import * as Yup from "yup";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import { createReport } from "@/requests/reports";
import image from "@/assets/4-3.jpg";
import { UserContext } from "@/store";

const validationSchema = Yup.object({
  volunteer: Yup.string().required("Це поле обов'язкове"),
  title: Yup.string().required("Це поле обов'язкове"),
  description: Yup.string().required("Це поле обов'язкове"),
  request: Yup.string().required("Це поле обов'язкове"),
});

export const ReportForm = ({ requestId }: { requestId: string }) => {
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { user } = useContext(UserContext);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages(
        files.map((file) => process.env.NEXT_PUBLIC_IMAGES_URL + file.name)
      );
    }
  };

  const formik = useFormik({
    initialValues: {
      volunteer: user ? user._id : "",
      title: "",
      description: "",
      request: requestId,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await createReport({
          ...values,
          images: images,
        });
        setIsSubmitted(true);
      } catch (error) {
        console.log("error", error);
      }
    },
  });
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;
  return (
    <Box sx={{ textAlign: "center" }}>
      {isSubmitted ? (
        <Box>
          <Typography component="h1" variant="h5" mb={4}>
            Вітаю, ви успішно створли звіт!
          </Typography>
        </Box>
      ) : (
        <FormikProvider value={formik}>
          <Form>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              <Typography component="h1" variant="h5" mb={4}>
                Створити звіт
              </Typography>
              <FormTextField
                getFieldProps={getFieldProps}
                id={"title"}
                label="Заголовок"
                error={Boolean(touched.title && errors.title)}
                helperText={touched.title && errors.title ? errors.title : ""}
              />
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
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
              >
                <Button variant="contained" component="label">
                  Upload Images
                  <input
                    type="file"
                    hidden
                    multiple
                    onChange={handleImageChange}
                  />
                </Button>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "5px",
                    img: {
                      width: "auto",
                      height: "50px",
                    },
                  }}
                >
                  {images.map((image: string) => (
                    <Typography key={image}>{image}</Typography>
                  ))}
                </Box>
              </Box>
              <Button type="submit" fullWidth variant="contained">
                Створити звіт
              </Button>
            </Box>
          </Form>
        </FormikProvider>
      )}
    </Box>
  );
};
