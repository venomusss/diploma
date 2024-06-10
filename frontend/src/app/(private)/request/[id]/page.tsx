"use client";

import { RequestDetails } from "@/components/RequestDetails";
import { RequestItemCard } from "@/components/RequestItemCard";
import {
  getRefugeeRequestsById,
  getSingleRequestsById,
  responseRequestData,
} from "@/requests/request";
import { UserContext } from "@/store";
import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

export default function RequestPage({ params }: { params: { id: string } }) {
  const { user } = useContext(UserContext);
  const [request, setRequest] = useState<responseRequestData | null>(null);

  const fetchRequest = async () => {
    const response = await getSingleRequestsById(params.id);
    setRequest(response.request);
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
      {request && user && (
        <RequestDetails
          item={request}
          userData={user && user}
          refetch={fetchRequest}
        />
      )}
    </Box>
  );
}
