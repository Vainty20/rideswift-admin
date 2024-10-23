import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import store from "./features/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={AppRoutes} />
      <ToastContainer />
    </Provider>
  </StrictMode>
);
