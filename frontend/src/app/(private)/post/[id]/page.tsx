"use client";

import { PostDetails } from "@/components/PostDetails";
import { RequestDetails } from "@/components/RequestDetails";
import { RequestItemCard } from "@/components/RequestItemCard";
import { getSinglePostById, responsePostData } from "@/requests/posts";
import { UserContext } from "@/store";
import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

export default function PostPage({ params }: { params: { id: string } }) {
  const { user } = useContext(UserContext);
  const [request, setRequest] = useState<responsePostData | null>(null);

  const fetchRequest = async () => {
    const response = await getSinglePostById(params.id);
    setRequest(response.post);
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
        <PostDetails
          item={request}
          userData={user && user}
          refetch={fetchRequest}
        />
      )}
    </Box>
  );
}
