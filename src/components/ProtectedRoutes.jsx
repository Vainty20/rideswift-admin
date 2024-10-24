import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoutes({ children }) {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    } 
  }, [isLoggedIn, navigate]);

  return <>{children}</>;
}