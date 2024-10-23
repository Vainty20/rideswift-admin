import { createBrowserRouter } from "react-router-dom";
import ProtectedRoutes from "../components/ProtectedRoutes";
import HomeLayout from "../components/layouts/HomeLayout";
import PageNotFound from "../pages/PageNotFound";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import BookingsPage from "../pages/BookingsPage";
import DriversPage from "../pages/DriversPage";
import SchedulePage from "../pages/SchedulePage";
import MotorcyclesPage from "../pages/MotorcyclesPage";
import UsersPage from "../pages/UsersPage";
import ReportsPage from "../pages/ReportsPage";
import SettingsPage from "../pages/SettingsPage";
import ViewBookingPage from "../pages/ViewBookingPage";
import ViewDriverPage from "../pages/ViewDriverPage";
import ViewUserPage from "../pages/ViewUserPage";
import ViewReportPage from "../pages/ViewReportPage";

export const AppRoutes = createBrowserRouter([
  {
    path: "*",
    element: <PageNotFound />,
  },
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    element: (
      <ProtectedRoutes>
        <HomeLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "/dashboard",
        element: (
          <ProtectedRoutes>
            <DashboardPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/bookings",
        element: (
          <ProtectedRoutes>
            <BookingsPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/drivers",
        element: (
          <ProtectedRoutes>
            <DriversPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/schedules",
        element: (
          <ProtectedRoutes>
            <SchedulePage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/motorcycles",
        element: (
          <ProtectedRoutes>
            <MotorcyclesPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/users",
        element: (
          <ProtectedRoutes>
            <UsersPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/reports",
        element: (
          <ProtectedRoutes>
            <ReportsPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/settings",
        element: (
          <ProtectedRoutes>
            <SettingsPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/bookings/:id",
        element: (
          <ProtectedRoutes>
            <ViewBookingPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/drivers/:id",
        element: (
          <ProtectedRoutes>
            <ViewDriverPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/users/:id",
        element: (
          <ProtectedRoutes>
            <ViewUserPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/reports/:id",
        element: (
          <ProtectedRoutes>
            <ViewReportPage />
          </ProtectedRoutes>
        ),
      },
    ],
  },
]);
