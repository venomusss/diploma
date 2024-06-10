"use client";

import { ProfileCard } from "@/components/ProfileCard";
import { RegistrationData } from "@/requests/auth";
import { getUserComments, responseCommentData } from "@/requests/comments";
import { getUserPosts, responsePostData } from "@/requests/posts";
import { getUserById } from "@/requests/profile";
import { getReports, responseReportData } from "@/requests/reports";
import {
  getRefugeeRequestsById,
  responseRequestData,
} from "@/requests/request";
import { UserContext } from "@/store";
import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

export interface IUserData {
  user: RegistrationData;
  posts: responsePostData[];
  refugeeRequests: responseRequestData[];
  comments: responseCommentData[];
  reports: responseReportData[];
}

const fetchUserData = async (userId: string) => {
  try {
    const [
      userResponse,
      postsResponse,
      refugeeRequestsResponse,
      commentsResponse,
      repostsResponse,
    ] = await Promise.all([
      getUserById(userId),
      getUserPosts(userId),
      getRefugeeRequestsById(userId),
      getUserComments(userId),
      getReports(userId),
    ]);

    return {
      user: userResponse.data,
      posts: postsResponse,
      refugeeRequests: refugeeRequestsResponse,
      comments: commentsResponse,
      reports: repostsResponse,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default function ProfilePage({ params }: { params: { id: string } }) {
  const [userData, setUserData] = useState<IUserData | null>(null);
  const { user } = useContext(UserContext);
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const data = await fetchUserData(params.id);
        setUserData(data);
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };

    loadUserData();
  }, [params.id]);

  const refetchComments = async () => {
    if (userData) {
      const response = await getUserComments(params.id);
      setUserData({ ...userData, comments: response });
    }
  };

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
      {userData && (
        <ProfileCard
          user={userData.user}
          posts={userData.posts}
          refugeeRequests={userData.refugeeRequests}
          comments={userData.comments}
          refetchComments={refetchComments}
          isMyProfile={user?._id === params.id}
          reports={userData.reports}
        />
      )}
    </Box>
  );
}
