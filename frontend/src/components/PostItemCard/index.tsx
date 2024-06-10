import { ILabelForInterface } from "@/requests/request";
import { Box, Button, Card, Typography } from "@mui/material";
import React from "react";
import { Delete } from "@mui/icons-material";
import {
  IPostState,
  IPostStateForInterface,
  deletePostById,
  responsePostData,
} from "@/requests/posts";
import Link from "next/link";

export const PostItemCard = ({
  item,
  refetch,
  isDeletable = true,
}: {
  item: responsePostData;
  refetch?: () => void;
  isDeletable?: boolean;
}) => {
  const deleteHandler = async () => {
    if (refetch) {
      await deletePostById(item._id);
      refetch();
    }
  };
  return (
    <Card
      sx={{
        boxShadow: "0px 0px 10px 3px rgba(214,214,214,1)",
        p: 2,
        boxSizing: "border-box",
        borderRadius: "25px",
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        margin: "0 auto",
        maxWidth: "600px",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "12px",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Link key={item.title} href={`/post/${item._id}`}>
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            sx={{ color: "#496F5D", fontWeight: "700" }}
          >
            {item.title}
          </Typography>
        </Link>
        {isDeletable && item.state === IPostState.OPENED && (
          <Delete
            color="error"
            sx={{ cursor: "pointer" }}
            onClick={deleteHandler}
          />
        )}
      </Box>
      <Typography>
        <b>Волонтер: </b>{" "}
        <Link href={`/profile/${item.volunteerId?._id}`}>
          {item.volunteerId && item.volunteerId.name}
        </Link>
      </Typography>
      <Typography>
        <b>Стан:</b> {IPostStateForInterface[item.state]}
      </Typography>
      <Typography>
        <b>Тип допомоги:</b> {ILabelForInterface[item.label]}
      </Typography>
      <Typography>
        <b>Кількість людей, що відгукнулись на пропозицію:</b>{" "}
        {item.refugeeIds.length}/{item.maxNumberOfRefugees}
      </Typography>
    </Card>
  );
};
