"use client";

import { Filters } from "@/components/Filters";
import { RequestItemCard } from "@/components/RequestItemCard";
import {
  FilterData,
  IState,
  getRefugeeRequestsById,
  responseRequestData,
} from "@/requests/request";
import { UserContext } from "@/store";
import { Box, Link } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

export default function MyRequestPage() {
  const { user } = useContext(UserContext);
  const [requests, setRequests] = useState<responseRequestData[]>([]);
  const [filters, setFilters] = useState<FilterData>({
    label: "",
    state: "",
    search: "",
  });

  async function fetchData() {
    if (user && user._id) {
      try {
        const response = await getRefugeeRequestsById(user._id, filters);
        if (response) {
          setRequests(response);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }
  }

  useEffect(() => {
    fetchData();
  }, [user, filters]);

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
      <Filters filters={filters} setFilters={setFilters} stateEnum={IState} />
      {requests.map((item) => (
        <RequestItemCard key={item.title} item={item} refetch={fetchData} />
      ))}
    </Box>
  );
}
