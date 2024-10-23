import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const editPersonalInfoValidationSchema = Yup.object({
  username: Yup.string().required("First Name is required"),
});

export const changePasswordValidationSchema = Yup.object({
  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  currentPassword: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("currentPassword"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export const vehicleValidationSchema = Yup.object().shape({
  vehicle: Yup.string()
    .required("Vehicle name is required")
    .min(2, "Vehicle name is too short"),
});


export const scheduledAtValidationSchema = Yup.object().shape({
  scheduledAt: Yup.date()
    .required("Scheduled date is required")
    .min(new Date(), "Scheduled date cannot be in the past.")
    .min(new Date(new Date().setDate(new Date().getDate() + 1)), "Scheduled date must be at least one day after today."),
});