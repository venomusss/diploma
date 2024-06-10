"use client";

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {
  useEffect(() => {
    redirect("/login");
  }, []);

  return null;
}
