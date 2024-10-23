import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  verifyBeforeUpdateEmail,
} from "firebase/auth";
import { auth, db, storage } from "../../config/firebaseConfig";
import { formatDateAndTime } from "../../utils/formatDate";

export const logIn = createAsyncThunk(
  "auth/logIn",
  async ({ email, password }) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    if (!user.emailVerified) {
      await sendEmailVerification(user);
      await signOut(auth);
      throw new Error(
        "Please verify your email to login. A verification email has been sent."
      );
    }

    const userDocRef = doc(db, "admins", user.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      await signOut(auth);
      throw new Error("Admin not found in our database.");
    }

    const userData = userDocSnap.data();

    return {
      id: user.uid,
      email: user.email,
      ...userData,
      createdAt: formatDateAndTime(userData.createdAt),
    };
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (user) => {
    if (!user) {
      throw new Error("No user is currently logged in.");
    }

    const userDocRef = doc(db, "admins", user.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      throw new Error("Admin not found in our database.");
    }

    const userData = userDocSnap.data();
    return {
      id: user.uid,
      email: user.email,
      ...userData,
      createdAt: formatDateAndTime(userData.createdAt),
    };
  }
);

export const editPersonalInfo = createAsyncThunk(
  "auth/editPersonalInfo",
  async ({ username }) => {
    const user = auth.currentUser;

    if (!user) {
      throw new Error("No user is currently logged in.");
    }

    const userDocRef = doc(db, "admins", user.uid);

    await updateDoc(userDocRef, {
      username,
    });

    return { username };
  }
);

export const changeProfilePic = createAsyncThunk(
  "auth/changeProfilePic",
  async (blob) => {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("No user is currently logged in.");
    }

    const storageRef = ref(storage, `admins/${user.uid}/profilePic`);

    const snapshot = await uploadBytes(storageRef, blob);

    const url = await getDownloadURL(snapshot.ref);

    const userDocRef = doc(db, "admins", user.uid);
    await updateDoc(userDocRef, { profilePic: url });

    return url;
  }
);

export const changeEmail = createAsyncThunk(
  "auth/changeEmail",
  async ({ newEmail, password }) => {
    const user = auth.currentUser;

    if (!user) {
      throw new Error("No user is currently logged in.");
    }

    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      password
    );
    await reauthenticateWithCredential(auth.currentUser, credential);
    await verifyBeforeUpdateEmail(auth.currentUser, newEmail);
    await signOut(auth);
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async ({ email }) => {
    if (!email) {
      throw new Error(
        "An email address is required to send the password reset link."
      );
    }

    await sendPasswordResetEmail(auth, email);
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async ({ newPassword, currentPassword }) => {
    const user = auth.currentUser;

    if (!user) {
      throw new Error("No user is currently logged in.");
    }

    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      currentPassword
    );
    await reauthenticateWithCredential(auth.currentUser, credential);
    await updatePassword(auth.currentUser, newPassword);
  }
);

export const logOut = createAsyncThunk("auth/logOut", async () => {
  await signOut(auth);
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    isLoggedIn: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.isLoggedIn = true;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.error = action.error.message;
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.error = action.error.message;
      })
      .addCase(editPersonalInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(editPersonalInfo.fulfilled, (state, action) => {
        if (state.user) {
          state.user.username = action.payload.username;
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(editPersonalInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(changeProfilePic.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeProfilePic.fulfilled, (state, action) => {
        if (state.user) {
          state.user.profilePic = action.payload;
        }
        state.loading = false;
      })
      .addCase(changeProfilePic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.error = null;
        state.isLoggedIn = false;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
