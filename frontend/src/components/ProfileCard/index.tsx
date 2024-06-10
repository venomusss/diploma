import {
  RegistrationData,
  UserRoleForInterface,
  deleteUser,
} from "@/requests/auth";
import { Box, Button, Card, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Map from "../Map";
import React, { useContext } from "react";
import { IUserData } from "@/app/(private)/profile/[id]/page";
import { CommentForm } from "../CommentForm";
import { CommentItem } from "../CommentItem";
import Link from "next/link";
import { UserContext } from "@/store";

interface IProfileCard extends IUserData {
  refetchComments: () => void;
  isMyProfile: boolean;
}

export const ProfileCard = (props: IProfileCard) => {
  const {
    user,
    refugeeRequests,
    posts,
    comments,
    refetchComments,
    isMyProfile,
    reports,
  } = props;

  const { removeUser } = useContext(UserContext);

  const encodedUser = encodeURIComponent(JSON.stringify(user));

  const deleteHandler = async () => {
    if (user._id) {
      await deleteUser(user._id);
      removeUser();
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
        gap: "15px",
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
          {isMyProfile && "Мій "}Профіль
        </Typography>
        {isMyProfile && (
          <Link href={`/edit-profile/${encodedUser}`}>Редагувати</Link>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "15px",
          alignItems: "center",
        }}
      >
        <AccountCircleIcon sx={{ color: "#496F5D", fontSize: "100px" }} />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography>
            <b>{`Ім'я:`}</b> {user.name}
          </Typography>
          <Typography>
            <b>Номер телефону:</b>{" "}
            <a href={`tel:${user.phoneNumber}`}>{user.phoneNumber}</a>
          </Typography>
          <Typography>
            <b>Електронна адреса:</b>{" "}
            <a href={`mailto:${user.email}`}>{user.email}</a>
          </Typography>
          <Typography>
            <b>Роль:</b> {UserRoleForInterface[user.role]}
          </Typography>
        </Box>
      </Box>
      {user.location && (
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
          <Map position={user.location} />
        </Box>
      )}
      {posts.length > 0 && (
        <Box>
          <Typography>
            <b>Пропозиції користувача:</b>
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            {posts.map((post) => (
              <Link key={post._id} href={`/post/${post._id}`}>
                <Typography>{post.title}</Typography>
              </Link>
            ))}
          </Box>
        </Box>
      )}
      {refugeeRequests.length > 0 && (
        <Box>
          <Typography>
            <b>Запити користувача:</b>
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            {refugeeRequests.map((request) => (
              <Link key={request._id} href={`/request/${request._id}`}>
                <Typography>{request.title}</Typography>
              </Link>
            ))}
          </Box>
        </Box>
      )}
      {reports.length > 0 && (
        <Box>
          <Typography>
            <b>Звіти:</b>
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            {reports.map((report) => (
              <Link key={report._id} href={`/report/${report._id}`}>
                <Typography>{report.title}</Typography>
              </Link>
            ))}
          </Box>
        </Box>
      )}
      <Box>
        <Typography>
          <b>Коментарі:</b>
        </Typography>
        {user._id && (
          <CommentForm
            commentatorId={user._id}
            refetchComments={refetchComments}
          />
        )}
        <Box
          sx={{
            my: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {comments.length > 0 ? (
            <>
              {comments.map((comment) => (
                <CommentItem key={comment._id} comment={comment} />
              ))}
            </>
          ) : (
            <Typography>Коментарів немає</Typography>
          )}
        </Box>
      </Box>
      {isMyProfile && (
        <Button variant="contained" onClick={deleteHandler} color="error">
          Видалити профіль
        </Button>
      )}
    </Card>
  );
};
