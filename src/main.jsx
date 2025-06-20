import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "@/components/ui/sonner";
import "non.geist";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import HomePage from "./pages/HomePage";
import DoctorPage from "./pages/doctorPage";
import LoginPage from "./pages/loginPage";
import PatientPage from "./pages/patientPage";
import PharmacyPage from "./pages/pharmacyPage";
import RegisterPage from "./pages/registerPage";
import VolunteerPage from "./pages/volunteerPage";
import ErrorPage from "./pages/ErrorPage";
import AidForm from "./pages/AidForm";
import ConsultationForm from "./pages/ConsultationForm";
import PharmacyDashboard from "./pages/PharmacyDashboard";
import ProfilePage from "./pages/ProfilePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/doctor",
    element: <DoctorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/patient",
    element: <PatientPage />,
  },
  {
    path: "/pharmacy",
    element: <PharmacyPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/volunteer",
    element: <VolunteerPage />,
  },
  {
    path: "/aid-form",
    element: <AidForm />,
  },
  {
    path: "/consult-form",
    element: <ConsultationForm />,
  },
  {
    path: "/dashboard/pharmacy",
    element: <PharmacyDashboard />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <>
      <RouterProvider router={router} />
      <Toaster position="top-center" richColors />
    </>
  </StrictMode>
);
