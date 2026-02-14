import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Spinner from "./Components/Lazy/Spinner";
const Login = lazy(() => import("./Components/Auth/Login"));
const SignUp = lazy(() => import("./Components/Auth/SignUp"));
const Home = lazy(() => import("./Components/Home/Home"));
const ConfirmSignup = lazy(() => import("./Components/Auth/ConfirmSignup"));

export default function AppRoutes() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/confirm" element={<ConfirmSignup />} />
      </Routes>
    </Suspense>
  );
}
