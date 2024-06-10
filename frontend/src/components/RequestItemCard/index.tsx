import {
  ILabelForInterface,
  IState,
  IStateForInterface,
  deleteRequestsById,
  responseRequestData,
} from "@/requests/request";
import { Box, Button, Card, Typography } from "@mui/material";
import React from "react";
import { Delete } from "@mui/icons-material";
import Link from "next/link";

export const RequestItemCard = ({
  item,
  refetch,
  isDeletable = true,
}: {
  item: responseRequestData;
  refetch: () => void;
  isDeletable?: boolean;
}) => {
  const deleteHandler = async () => {
    await deleteRequestsById(item._id);
    refetch();
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
        <Link key={item.title} href={`/request/${item._id}`}>
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            sx={{ color: "#496F5D", fontWeight: "700" }}
          >
            {item.title}
          </Typography>
        </Link>
        {isDeletable && item.state === IState.PENDING && (
          <Delete
            color="error"
            sx={{ cursor: "pointer" }}
            onClick={deleteHandler}
          />
        )}
      </Box>
      <Typography>
        <b>Автор запиту: </b>
        <Link href={`/profile/${item.refugeeId?._id}`}>
          {item.refugeeId?.name}
        </Link>
      </Typography>
      <Typography>
        <b>{"Прив'язаний волонтер: "}</b>
        <Link href={`/profile/${item.volunteerId?._id}`}>
          {item.volunteerId?.name
            ? item.volunteerId?.name
            : "Цей запит не був взятий в роботу волонтером"}
        </Link>
      </Typography>
      <Typography>
        <b>Стан:</b> {IStateForInterface[item.state]}
      </Typography>
      <Typography>
        <b>Тип потрібної допомоги:</b> {ILabelForInterface[item.label]}
      </Typography>
    </Card>
  );
};
