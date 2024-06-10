"use client";

import { isAuthencificated } from "@/helpers/auth";
import { UserContext } from "@/store";
import { redirect } from "next/navigation";
import React, { PropsWithChildren, useContext, useEffect } from "react";

const AuthMiddleware = ({ children }: PropsWithChildren) => {
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (isAuthencificated(user)) {
      redirect("/all-requests");
    }
  }, [user]);

  return <React.Fragment>{children}</React.Fragment>;
};

export default AuthMiddleware;
