import { Routes, Route, Navigate } from "react-router-dom";
import { CalendarPage } from "../calendar";
import { LoginPage } from "../auth";
import { AuthStatus } from "../store/auth/authState";
import { useAuthStore } from "../hooks";
import { useEffect } from "react";

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === AuthStatus.CHECKING) {
    return <h1>Loading...</h1>;
  }

  return (
    <Routes>
      {status === AuthStatus.NOT_AUTHENTICATED ? (
        <>
          <Route path="/auth/*" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="auth/login" />} />
        </>
      ) : (
        <>
          <Route path="/" element={<CalendarPage />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
};
