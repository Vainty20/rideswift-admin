import { useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Button } from "react-daisyui";
import { useDispatch } from "react-redux";
import { editPersonalInfo } from "../../features/auth/authSlice";
import { editPersonalInfoValidationSchema } from "../../utils/validationSchema";
import { IoPersonOutline } from "react-icons/io5";
import Input from "../ui/Input";

export default function EditPersonalInfoForm({ user }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: {
      username: user?.username || "",
    },
    validationSchema: editPersonalInfoValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await dispatch(editPersonalInfo(values)).unwrap();
        toast.success("You have successfully updated your info!");
        setError(null);
      } catch (err) {
        console.error(err);
        setError(err);
        toast.error("Failed to update your info. Please try again.");
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
        <div className="label">
          <span className="label-text text-secondary text-lg">Username</span>
        </div>
        <Input
          id="username"
          name="username"
          maxLength={20}
          placeholder="Enter your username"
          className="w-full"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          icon={<IoPersonOutline size={30} />}
        />
        {formik.touched.username && formik.errors.username ? (
          <div className="text-error mt-2">{formik.errors.username}</div>
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
        <div className="text-error text-center mt-2">{error}</div>
      ) : null}
    </form>
  );
}
