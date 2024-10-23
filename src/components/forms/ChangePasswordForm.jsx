import { useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Button } from "react-daisyui";
import { useDispatch } from "react-redux";
import { changePassword } from "../../features/auth/authSlice";
import { changePasswordValidationSchema } from "../../utils/validationSchema";
import { formatFirebaseAuthError } from "../../utils/formatFirebaseAuthError";
import PasswordInput from "../ui/PasswordInput";

export default function ChangePasswordForm() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      currentPassword: "",
      confirmPassword: "",
    },
    validationSchema: changePasswordValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await dispatch(changePassword({ ...values })).unwrap();
        toast.success("You have successfully changed your password!");
        setError(null);
      } catch (err) {
        console.error(err);
        setError(err);
        toast.error("Failed to change password. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col space-y-4 max-w-lg"
    >
      <div>
        <label htmlFor="newPassword" className="block mb-1">
          New Password
        </label>
        <PasswordInput
          size="lg"
          type="password"
          id="newPassword"
          name="newPassword"
          placeholder="Enter your password"
          className="w-full"
          maxLength={50}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.newPassword}
          bordered
        />
        {formik.touched.newPassword && formik.errors.newPassword ? (
          <div className="text-error mt-2">{formik.errors.newPassword}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="currentPassword" className="block mb-1">
          Current Password
        </label>
        <PasswordInput
          size="lg"
          type="password"
          id="currentPassword"
          name="currentPassword"
          placeholder="Enter your password"
          className="w-full"
          maxLength={50}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.currentPassword}
          bordered
        />
        {formik.touched.currentPassword && formik.errors.currentPassword ? (
          <div className="text-error mt-2">{formik.errors.currentPassword}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block mb-1">
          Confirm Password
        </label>
        <PasswordInput
          size="lg"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm your password"
          className="w-full"
          maxLength={50}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
          bordered
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div className="text-error mt-2">{formik.errors.confirmPassword}</div>
        ) : null}
      </div>

      <Button
        size="lg"
        type="submit"
        color="primary"
        disabled={loading}
        className="text-white"
      >
        {loading ? "Loading..." : "Save"}
      </Button>

      {error ? (
        <div className="text-error text-center mt-2">
          {formatFirebaseAuthError(error.message)}
        </div>
      ) : null}
    </form>
  );
}
