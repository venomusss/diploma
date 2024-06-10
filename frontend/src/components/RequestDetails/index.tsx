import {
  ILabelForInterface,
  IState,
  IStateForInterface,
  deleteRequestsById,
  responseRequestData,
  updateRequestById,
} from "@/requests/request";
import { Box, Button, Card, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { Delete } from "@mui/icons-material";
import { RegistrationData, UserRole } from "@/requests/auth";
import Map from "../Map";
import Link from "next/link";
import { UserContext, UserContextData } from "@/store";

export const RequestDetails = ({
  item,
  userData,
  refetch,
}: {
  item: responseRequestData;
  userData: UserContextData;
  refetch: () => void;
}) => {
  const [isSubmitting, setIsSubmiting] = useState(false);
  const [showButton, setShowButton] = useState(
    userData.role === UserRole.VOLUNTEER && !item.volunteerId
  );
  const { user } = useContext(UserContext);
  const acceptHandler = async () => {
    if (userData._id) {
      setIsSubmiting(true);
      await updateRequestById(item._id, {
        ...item,
        volunteerId: userData._id,
        state: IState.IN_WORK,
      });
      await refetch();
      setShowButton(false);
      setIsSubmiting(false);
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
          alignItems: "center",
          gap: "20px",
          justifyContent: "space-between",
        }}
      >
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          sx={{ color: "#496F5D", fontWeight: "700" }}
        >
          {item.title}
        </Typography>
        {user?._id === item.refugeeId?._id && (
          <Link href={`/update-request/${item._id}`}>Редагувати</Link>
        )}
      </Box>
      <Typography
        dangerouslySetInnerHTML={{
          __html: item.description.replaceAll("\n", "<br/>"),
        }}
      />
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
      {item.location && (
        <Box
          sx={{
            height: "320px",
            "& > div": {
              height: "300px !important",
            },
          }}
        >
          <Typography>
            <b>Місцезнаходження:</b>
          </Typography>
          <Map position={item.location} />
        </Box>
      )}
      {showButton && (
        <Button
          variant="contained"
          sx={{
            width: "fit-content",
            background: "#496F5D !important",
            color: "#FFFFFF",
            mt: "20px",
          }}
          disabled={isSubmitting}
          onClick={acceptHandler}
        >
          Взяти в роботу
        </Button>
      )}
      {userData._id === item.volunteerId?._id &&
        item.state !== IState.COMPLETED && (
          <Link href={`/create-report/${item._id}`}>
            <Button
              variant="contained"
              sx={{
                width: "fit-content",
                background: "#496F5D !important",
                color: "#FFFFFF",
                mt: "20px",
              }}
            >
              Відзвітувати про виконання
            </Button>
          </Link>
        )}
    </Card>
  );
};
