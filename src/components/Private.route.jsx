import { useAuth } from "@/context/AuthContext";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();

  const { loading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated && loading === false) {
      navigate("/auth");
    }
  }, [loading, isAuthenticated, navigate]);

  if (loading) return <BarLoader width={"100%"} color="#36d7b7" />;

  if (isAuthenticated) return children;
};

export default PrivateRoute;
