"use client";

import { ReportForm } from "@/components/ReportForm";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function ProfilePage({ params }: { params: { id: string } }) {
  return (
    <Box
      sx={{
        boxSizing: "border-box",
        borderRadius: "25px",
        margin: "50px auto",
        maxWidth: "600px",
        width: "100%",
      }}
    >
      <ReportForm requestId={params.id} />
    </Box>
  );
}
