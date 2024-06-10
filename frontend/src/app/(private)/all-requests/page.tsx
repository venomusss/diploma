"use client";

import { Filters } from "@/components/Filters";
import { RequestItemCard } from "@/components/RequestItemCard";
import {
  FilterData,
  IState,
  getAllRequests,
  responseRequestData,
} from "@/requests/request";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

export default function AllRequestPage() {
  const [requests, setRequests] = useState<responseRequestData[]>([]);
  const [filters, setFilters] = useState<FilterData>({
    label: "",
    state: "",
    search: "",
  });

  async function fetchData() {
    try {
      const response = await getAllRequests(filters);
      console.log(response);
      if (response) {
        setRequests(response);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }
  useEffect(() => {
    fetchData();
  }, [filters]);

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
        <RequestItemCard
          key={item.title}
          item={item}
          refetch={fetchData}
          isDeletable={false}
        />
      ))}
    </Box>
  );
}
