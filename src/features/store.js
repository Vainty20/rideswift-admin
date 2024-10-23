import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import vehicleReducer from "./motorycles/vehicleSlice";
import scheduleReducer from "./schedules/scheduleSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    vehicles: vehicleReducer,
    schedules: scheduleReducer,
  },
});

export default store;
