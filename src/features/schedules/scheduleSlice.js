import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  addDoc,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { formatDateAndTime } from "../../utils/formatDate";
import sendEmail from "../../utils/sendEmail";

export const fetchSchedules = createAsyncThunk(
  "schedules/fetchSchedules",
  async (_, { rejectWithValue }) => {
    try {
      const querySnapshot = await getDocs(collection(db, "schedules"));
      const fetchedData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        scheduledAt: formatDateAndTime(doc.data().scheduledAt),
      }));

      return fetchedData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addSchedule = createAsyncThunk(
  "schedules/addSchedule",
  async ({ driver, scheduledAt }, { rejectWithValue }) => {
    try {
      // Convert scheduledAt to a Date object
      const scheduledDateTime = new Date(scheduledAt);
      const startOfDay = new Date(scheduledDateTime.setHours(0, 0, 0, 0));
      const endOfDay = new Date(scheduledDateTime.setHours(23, 59, 59, 999));

      const q = query(
        collection(db, "schedules"),
        where("driverId", "==", driver.id),
        where("scheduledAt", ">=", Timestamp.fromDate(startOfDay)),
        where("scheduledAt", "<=", Timestamp.fromDate(endOfDay))
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        throw new Error(
          `Driver has already been scheduled for ${scheduledDateTime.toLocaleDateString()}.`
        );
      }

      const scheduleData = {
        driverId: driver.id,
        driverProfilePic: driver.profilePic,
        driverName: `${driver.firstName} ${driver.lastName}`,
        driverMobileNumber: driver.mobileNumber,
        driverVehicle: driver.vehicle,
        driverPlateNumber: driver.plateNumber,
        driverMaxLoad: driver.maxLoad,
        scheduledAt: Timestamp.fromDate(scheduledDateTime),
      };

      const docRef = await addDoc(collection(db, "schedules"), scheduleData);

      await sendEmail({
        to_email: driver.email,
        subject: "Evaluation Appointment Confirmation for RideSwift",
        message: `
            We are pleased to inform you that your evaluation appointment for the RideSwift application has been scheduled.
             
            Date: ${formatDateAndTime(scheduledDateTime)}
    
            To ensure a smooth evaluation process, please make sure to bring the following documents:
    
            1. Valid driver's license
            2. Original copy of your motorcycle's OR/CR (Official Receipt/Certificate of Registration) along with one photocopy
            3. Your motorcycle for assessment purposes
            
            We kindly request that you arrive at least 15 minutes before your scheduled time. This will allow you ample time to complete the necessary application forms and other paperwork prior to your evaluation.
            
            We look forward to seeing you at your scheduled appointment and wish you the best of luck with your evaluation.`,
      });

      return {
        id: docRef.id,
        ...scheduleData,
        scheduledAt: formatDateAndTime(scheduledDateTime),
      };
    } catch (error) {
      console.error("Failed to add schedule:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteSchedule = createAsyncThunk(
  "schedules/deleteSchedule",
  async (id, { rejectWithValue }) => {
    try {
      const scheduleRef = doc(db, "schedules", id);
      await deleteDoc(scheduleRef);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const scheduleslice = createSlice({
  name: "schedules",
  initialState: {
    schedules: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSchedules.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSchedules.fulfilled, (state, action) => {
        state.loading = false;
        state.schedules = action.payload;
      })
      .addCase(fetchSchedules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addSchedule.pending, (state) => {
        state.loading = true;
      })
      .addCase(addSchedule.fulfilled, (state, action) => {
        state.loading = false;
        state.schedules.push(action.payload);
      })
      .addCase(addSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteSchedule.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSchedule.fulfilled, (state, action) => {
        state.loading = false;
        state.schedules = state.schedules.filter(
          (vehicle) => vehicle.id !== action.payload
        );
      })
      .addCase(deleteSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default scheduleslice.reducer;
