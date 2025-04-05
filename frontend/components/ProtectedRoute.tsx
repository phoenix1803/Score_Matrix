"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    if (user === null) {
      // Not logged in, redirect to login
      router.replace("/login");
    } else if (user !== undefined) {
      // Logged in or still checking
      setCheckingAuth(false);
    }
  }, [user, router]);

  if (checkingAuth) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
