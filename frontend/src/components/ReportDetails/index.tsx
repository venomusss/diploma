import { Box, Button, Card, Typography } from "@mui/material";
import React, { useState } from "react";
import { ReportDetailsData, responseReportData } from "@/requests/reports";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Link from "next/link";

export const ReportDetails = ({ data }: { data: ReportDetailsData }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Card
      sx={{
        boxShadow: "0px 0px 10px 3px rgba(214,214,214,1)",
        p: 2,
        boxSizing: "border-box",
        borderRadius: "25px",
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        margin: "0 auto",
        maxWidth: "600px",
        width: "100%",
        button: {
          "&::before": {
            color: "#496F5D",
          },
        },
      }}
    >
      <Typography
        component="h2"
        variant="h5"
        color="inherit"
        sx={{ color: "#496F5D", fontWeight: "700" }}
      >
        {data.title}
      </Typography>
      <Typography>
        <Link href={`/request/${data.request}`}>
          <b>Посилання на запит</b>
        </Link>
      </Typography>
      <Typography>
        <b>Волонтер: </b>
        <Link href={`/profile/${data.volunteer._id}`}>
          {data.volunteer.name}
        </Link>
      </Typography>
      {data.images && (
        <Box
          className="slider-container"
          sx={{ width: "90%", margin: "0 auto" }}
        >
          <Slider {...settings}>
            {data.images.map((image: string) => (
              <Box
                key={image}
                sx={{
                  height: "300px",
                  width: "100%",
                  backgroundImage: `url("${image}")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            ))}
          </Slider>
        </Box>
      )}
      <Typography
        dangerouslySetInnerHTML={{
          __html: data.description.replaceAll("\n", "<br/>"),
        }}
        sx={{ marginTop: "30px" }}
      />
    </Card>
  );
};
