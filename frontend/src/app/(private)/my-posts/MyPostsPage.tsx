"use client";
import { PostItemCard } from "@/components/PostItemCard";
import { getUserPosts, responsePostData } from "@/requests/posts";
import { UserContext } from "@/store";
import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

export default function MyPostsPage() {
  const { user } = useContext(UserContext);

  const [posts, setPosts] = useState<responsePostData[]>([]);

  async function fetchData() {
    if (user && user._id) {
      try {
        const response = await getUserPosts(user._id);
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
  }, []);

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
      {posts.map((item) => (
        <PostItemCard
          key={item.title}
          isDeletable={false}
          item={item}
          refetch={fetchData}
        />
      ))}
    </Box>
  );
}
