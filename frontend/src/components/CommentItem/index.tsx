import { responseCommentData } from "@/requests/comments";
import { Box, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import React from "react";
import Link from "next/link";

export const CommentItem = ({ comment }: { comment: responseCommentData }) => {
  const date = new Date(comment.updatedAt);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}`;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: "15px",
      }}
    >
      <AccountCircleIcon sx={{ color: "#496F5D", fontSize: "50px" }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "5px",
          }}
        >
          <Typography sx={{ fontSize: "16px" }}>
            {/* @ts-ignore */}
            <Link href={`/profile/${comment.commentator._id}`}>
              {/* @ts-ignore */}
              <b>{comment.commentator.name}</b>
            </Link>{" "}
            <span
              style={{
                color: "#787878",
                fontSize: "12px",
              }}
            >
              {formattedDate}
            </span>
          </Typography>
        </Box>
        <Typography
          sx={{ fontSize: "14px" }}
          dangerouslySetInnerHTML={{
            __html: comment.content.replaceAll("\n", "<br/>"),
          }}
        />
      </Box>
    </Box>
  );
};
