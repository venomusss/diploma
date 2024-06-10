"use client";

import { Header } from "@/components/Header";
import "./styles.css";
import { UserProvider } from "@/store";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <Header title="Допомога" />
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
