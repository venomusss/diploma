import { Box, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { createComment } from "@/requests/comments";
import { UserContext } from "@/store";

export const CommentForm = ({
  commentatorId,
  refetchComments,
}: {
  commentatorId: string;
  refetchComments: () => void;
}) => {
  const [comment, setComment] = useState("");
  const { user } = useContext(UserContext);
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setComment(event.target.value);
  };

  const sendCommentHandler = async () => {
    if (user && user?._id && commentatorId) {
      await createComment({
        content: comment,
        commentator: user._id,
        target: commentatorId,
      });
      setComment("");
      await refetchComments();
    }
  };

  return (
    <Box sx={{ display: "flex", gap: "10px", width: "100%" }}>
      <TextField
        sx={{ width: "100%" }}
        multiline
        minRows={2}
        value={comment}
        onChange={handleChange}
      />
      <Box sx={{ height: "100%", minWidth: "35px" }}>
        {comment.length > 0 && (
          <ChevronRightIcon
            sx={{
              fontSize: "30px",
              cursor: "pointer",
              color: "#FFFFFF",
              background: "#496F5D",
              borderRadius: "10px",
              width: "35px",
              height: "35px",
              "&:hover": {
                background: "#5a806e",
              },
            }}
            onClick={sendCommentHandler}
          />
        )}
      </Box>
    </Box>
  );
};
