import { ILabelForInterface, IState } from "@/requests/request";
import { Box, Button, Card, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { Delete } from "@mui/icons-material";
import { RegistrationData, UserRole } from "@/requests/auth";
import Map from "../Map";
import {
  IPostState,
  IPostStateForInterface,
  responsePostData,
  updatePostById,
} from "@/requests/posts";
import Link from "next/link";
import { UserContext, UserContextData } from "@/store";
import { Base64 } from "js-base64";

export const PostDetails = ({
  item,
  userData,
  refetch,
}: {
  item: responsePostData;
  userData: UserContextData;
  refetch: () => void;
}) => {
  const [isSubmitting, setIsSubmiting] = useState(false);
  const { user } = useContext(UserContext);
  const [showButton, setShowButton] = useState(
    item.refugeeIds.length < item.maxNumberOfRefugees &&
      !item.refugeeIds.includes(userData._id || "") &&
      userData.role !== UserRole.VOLUNTEER
  );

  const acceptHandler = async () => {
    if (userData._id) {
      setIsSubmiting(true);
      await updatePostById(item._id, {
        ...item,
        state:
          item.refugeeIds.length === item.maxNumberOfRefugees - 1
            ? IPostState.CLOSED
            : IPostState.OPENED,
        refugeeIds: [...item.refugeeIds, userData._id],
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
        {user?._id === item.volunteerId?._id && (
          <Link href={`/update-post/${item._id}`}>Редагувати</Link>
        )}
      </Box>
      <Typography
        dangerouslySetInnerHTML={{
          __html: item.description.replaceAll("\n", "<br/>"),
        }}
      />
      <Typography>
        <b>Волонтер: </b>
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
      {item.refugeeIds.length > 0 && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <Typography>
            <b>Список людей, що відгукнулись на пропозицію:</b>
          </Typography>
          {item.refugeeIds.map((item, index) => (
            <Link key={item} href={`/profile/${item}`}>
              Переселенець {index + 1}
            </Link>
          ))}
        </Box>
      )}
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
          Записатись на отримання допомоги
        </Button>
      )}
    </Card>
  );
};
