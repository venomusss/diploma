"use client";

import { Filters } from "@/components/Filters";
import { PostItemCard } from "@/components/PostItemCard";
import { IPostState, getAllPosts, responsePostData } from "@/requests/posts";
import { FilterData } from "@/requests/request";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

export default function AllPostsPage() {
  const [posts, setPosts] = useState<responsePostData[]>([]);
  const [filters, setFilters] = useState<FilterData>({
    label: "",
    state: "",
    search: "",
  });

  async function fetchData() {
    try {
      const response = await getAllPosts(filters);
      if (response) {
        setPosts(response);
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
      <Filters
        filters={filters}
        setFilters={setFilters}
        stateEnum={IPostState}
      />
      {posts.map((item) => (
        <PostItemCard
          key={item.title}
          item={item}
          refetch={fetchData}
          isDeletable={false}
        />
      ))}
    </Box>
  );
}
