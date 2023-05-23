import { Routes, Route, Navigate } from "react-router-dom";
import { CalendarPage } from "../calendar";
import { LoginPage } from "../auth";

const enum AuthStatus {
  AUTHENTICATED = "authenticated",
  NOT_AUTHENTICATED = "not-authenticated",
}

export const AppRouter = () => {
  const authStatus = AuthStatus.AUTHENTICATED;
  return (
    <Routes>
      {authStatus !== AuthStatus.AUTHENTICATED ? (
        <Route path="/auth/*" element={<LoginPage />} />
      ) : (
        <Route path="/*" element={<CalendarPage />} />
      )}
      <Route path="*" element={<Navigate to="auth/login" />} />
    </Routes>
  );
};
