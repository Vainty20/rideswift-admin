import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebaseConfig";

export const fetchVehicles = createAsyncThunk(
  "vehicles/fetchVehicles",
  async (_, { rejectWithValue }) => {
    try {
      const querySnapshot = await getDocs(collection(db, "vehicles"));
      const fetchedData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return fetchedData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addVehicle = createAsyncThunk(
  "vehicles/addVehicle",
  async (values, { rejectWithValue }) => {
    try {
      const q = query(
        collection(db, "vehicles"),
        where("vehicle", "==", values.vehicle)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        throw new Error(`Vehicle "${values.vehicle}" already exists.`);
      }

      const docRef = await addDoc(collection(db, "vehicles"), {
        vehicle: values.vehicle,
      });

      return { id: docRef.id, vehicle: values.vehicle };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateVehicle = createAsyncThunk(
  "vehicles/updateVehicle",
  async ({ id, values }, { rejectWithValue }) => {
    try {
      const q = query(
        collection(db, "vehicles"),
        where("vehicle", "==", values.vehicle)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        throw new Error(`Vehicle "${values.vehicle}" already exists.`);
      }

      const vehicleRef = doc(db, "vehicles", id);
      await updateDoc(vehicleRef, { vehicle: values.vehicle });
      return { id, vehicle: values.vehicle };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteVehicle = createAsyncThunk(
  "vehicles/deleteVehicle",
  async (id, { rejectWithValue }) => {
    try {
      const vehicleRef = doc(db, "vehicles", id);
      await deleteDoc(vehicleRef);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const vehicleSlice = createSlice({
  name: "vehicles",
  initialState: {
    vehicles: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVehicles.fulfilled, (state, action) => {
        state.loading = false;
        state.vehicles = action.payload;
      })
      .addCase(fetchVehicles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addVehicle.pending, (state) => {
        state.loading = true;
      })
      .addCase(addVehicle.fulfilled, (state, action) => {
        state.loading = false;
        state.vehicles.push(action.payload);
      })
      .addCase(addVehicle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateVehicle.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateVehicle.fulfilled, (state, action) => {
        state.loading = false;
        state.vehicles = state.vehicles.map((vehicle) =>
          vehicle.id === action.payload.id ? action.payload : vehicle
        );
      })
      .addCase(updateVehicle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteVehicle.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteVehicle.fulfilled, (state, action) => {
        state.loading = false;
        state.vehicles = state.vehicles.filter(
          (vehicle) => vehicle.id !== action.payload
        );
      })
      .addCase(deleteVehicle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default vehicleSlice.reducer;
