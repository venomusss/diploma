"use client";

import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { isAuthencificated } from "@/helpers/auth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "@/store";
import { allSections, refugeeSections, volunteerSections } from "./utils";
import { UserRole } from "@/requests/auth";

interface HeaderProps {
  title: string;
}

export const Header = (props: HeaderProps) => {
  const { title } = props;
  const { user, removeUser } = useContext(UserContext);
  const [sections, setSections] = React.useState(refugeeSections);

  const logoutHandler = () => {
    removeUser();
  };

  React.useEffect(() => {
    if (user?.role === UserRole.VOLUNTEER) {
      setSections(volunteerSections);
    } else if (user?.role === UserRole.REFUGEE) {
      setSections(refugeeSections);
    } else if (user?.role === UserRole.ADMIN) {
      setSections(allSections);
    }
  }, [user]);

  return (
    <Box>
      <Toolbar
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          background: "#496F5D",
          color: "#FFFFFF",
          border: "none",
        }}
      >
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1, fontWeight: 700 }}
        >
          {title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "16px",
            button: {
              background: "#E0E2DB !important",
              color: "#191716",
            },
          }}
        >
          {!isAuthencificated(user) ? (
            <>
              <Link href="/login">
                <Button variant="contained" size="small">
                  Увійти
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="contained" size="small">
                  Зареєструватись
                </Button>
              </Link>
            </>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "15px",
                alignItems: "center",
              }}
            >
              {user && (
                <Link href={`/profile/${user._id}`}>
                  <AccountCircleIcon
                    sx={{ color: "#FFFFFF" }}
                    fontSize="large"
                  />
                </Link>
              )}
              <Button variant="contained" size="small" onClick={logoutHandler}>
                Вийти
              </Button>
            </Box>
          )}
        </Box>
      </Toolbar>
      {isAuthencificated(user) && (
        <Toolbar
          component="nav"
          variant="dense"
          sx={{
            justifyContent: "space-between",
            overflowX: "auto",
            background: "#E0E2DB",
            border: "none",
          }}
        >
          {sections.map((section) => (
            <Link key={section.title} href={section.url}>
              <Typography
                sx={{
                  p: 1,
                  flexShrink: 0,
                  textDecoration: "none",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#496F5D",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                {section.title}
              </Typography>
            </Link>
          ))}
        </Toolbar>
      )}
    </Box>
  );
};
