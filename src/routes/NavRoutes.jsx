import {
    IoBarChartOutline,
    IoBicycleOutline,
    IoBookOutline,
    IoCalendarOutline,
    IoNewspaperOutline,
    IoPeopleOutline,
  } from "react-icons/io5";
  
  export const NavRoutes = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: IoBarChartOutline,
    },
    {
      path: "/bookings",
      label: "Bookings",
      icon: IoBookOutline,
    },
    {
      path: "/drivers",
      label: "Drivers",
      icon: IoBicycleOutline,
    },
    {
      path: "/schedules",
      label: "Schedule",
      icon: IoCalendarOutline,
    },
    {
      path: "/motorcycles",
      label: "Motorcycles",
      icon: IoBicycleOutline,
    },
    {
      path: "/users",
      label: "Users",
      icon: IoPeopleOutline,
    },
    {
      path: "/reports",
      label: "Reports",
      icon: IoNewspaperOutline,
    },
  ];
  