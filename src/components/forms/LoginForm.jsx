import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button } from "react-daisyui";
import { IoMailOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, logIn } from "../../features/auth/authSlice";
import { loginValidationSchema } from "../../utils/validationSchema";
import { formatFirebaseAuthError } from "../../utils/formatFirebaseAuthError";
import PasswordInput from "../ui/PasswordInput";
import Input from "../ui/Input";

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      dispatch(logIn(values))
        .unwrap()
        .then(() => {
          navigate("/dashboard");
        });
    },
  });

  const handleForgotPassword = (email) => {
    if (!email)
      return toast.error("Email is required to submit password reset link!");
    dispatch(forgotPassword(email))
      .unwrap()
      .then(() => {
        toast.success(
          "Password reset link sent successfully! Please check your inbox"
        );
      });
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-2 text-secondary"
    >
      <div>
        <div className="label">
          <span className="label-text text-secondary text-lg">Email</span>
        </div>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          icon={<IoMailOutline size={30} />}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-error mt-2">{formik.errors.email}</div>
        ) : null}
      </div>

      <div>
        <div className="label">
          <span className="label-text text-secondary text-lg">Password</span>
          <span
            className="label-text-alt text-info text-lg"
            onClick={() => handleForgotPassword({ email: formik.values.email })}
          >
            Forgot Password?
          </span>
        </div>

        <PasswordInput
          id="password"
          name="password"
          placeholder="Enter your password"
          className="w-full"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />

        {formik.touched.password && formik.errors.password ? (
          <div className="text-error mt-2">{formik.errors.password}</div>
        ) : null}
      </div>

      <Button
        size="lg"
        type="submit"
        disabled={loading}
        color="primary"
        className="text-white mt-4"
      >
        {loading ? "Loading..." : "Log in"}
      </Button>

      {error ? (
        <div className="text-error text-center mt-2">
          {formatFirebaseAuthError(error)}
        </div>
      ) : null}
    </form>
  );
}
