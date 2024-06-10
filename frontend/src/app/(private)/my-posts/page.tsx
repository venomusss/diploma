"use client";

import { Filters } from "@/components/Filters";
import { PostItemCard } from "@/components/PostItemCard";
import { IPostState, getUserPosts, responsePostData } from "@/requests/posts";
import { FilterData } from "@/requests/request";
import { UserContext } from "@/store";
import { Box, Link } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

export default function MyPostsPage() {
  const { addUser, user } = useContext(UserContext);

  const [posts, setPosts] = useState<responsePostData[]>([]);
  const [filters, setFilters] = useState<FilterData>({
    label: "",
    state: "",
    search: "",
  });

  async function fetchData() {
    if (user && user._id) {
      try {
        const response = await getUserPosts(user._id, filters);
        if (response) {
          setPosts(response);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
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
      <Filters
        filters={filters}
        setFilters={setFilters}
        stateEnum={IPostState}
      />
      {posts.map((item) => (
        <PostItemCard
          key={item.title}
          isDeletable={true}
          item={item}
          refetch={fetchData}
        />
      ))}
    </Box>
  );
}
