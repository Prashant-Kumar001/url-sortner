import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import { login } from "@/api/authAPI";
import { BeatLoader, ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const signInSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),

  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Signin = ({ longLink }) => {
  const { execute } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(signInSchema),
    mode: "onChange",
  });
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      await login(data.email, data.password);
      await execute();
      navigate(`/dashboard?${longLink ? `url=${longLink}` : ""}`);
    } catch (error) {
      const { message } = error;
      toast.error(message);
    }
  };

  return (
    <Card className="border-0 shadow-xl backdrop-blur-xl bg-white/70 dark:bg-gray-900/70">
      <CardHeader>
        <CardTitle className="text-xl">Welcome back</CardTitle>
        <CardDescription>Enter your credentials to continue</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
          <div>
            <Input
              placeholder="Email"
              type="email"
              className="h-11"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Input
              placeholder="Password"
              type="password"
              className="h-11"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-11 text-base font-semibold"
          >
            {isSubmitting ? <BeatLoader color="green" /> : "Sign In"}
          </Button>
        </form>
      </CardContent>

      <ClipLoader
        className="absolute top-1/2 left-1/2"
        loading={isSubmitting}
        size={25}
      />
    </Card>
  );
};

export default Signin;
