import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { signup } from "@/api/authAPI";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "@/schema/user";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ClipLoader } from "react-spinners";

const Signup = () => {
  const navigate = useNavigate();
  const { execute } = useAuth();
  const [profile, profilePreview] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(signupSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      profilePic: "",
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const profilePic = watch("profilePic");

  useEffect(() => {
    if (profilePic?.[0]) {
      profilePreview(URL.createObjectURL(profilePic?.[0]));
    } else {
      profilePreview(null);
    }
  }, [profilePic]);

  const handleSignup = async (data) => {
    try {
      const profilePic = data.profilePic?.[0];

      const formData = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      if (profilePic) {
        formData.profile_pic = data.profilePic?.[0];
      }

      await signup(formData);
      await execute();
      toast.success("Account created 🎉");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Card className="border-0 shadow-xl backdrop-blur-xl bg-white/70 dark:bg-gray-900/70">
      <CardHeader>
        <CardTitle className="text-xl">Create account 🚀</CardTitle>
        <CardDescription>Join us and get started in seconds</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(handleSignup)} className="space-y-4">
          <div>
            <Input
              placeholder="Full Name"
              className="h-11"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

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

          <div>
            <div className="flex items-center gap-2">
              <Input
                type="file"
                accept="image/*"
                className="h-11"
                {...register("profilePic")}
              />

              {profile && (
                <Avatar className="w-10 h-10">
                  <AvatarImage src={profile} />
                  <AvatarFallback />
                </Avatar>
              )}
            </div>
            {errors.profilePic && (
              <p className="text-red-500 text-sm mt-1">
                {errors.profilePic.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-11 text-base font-semibold"
          >
            {isSubmitting ? "Creating..." : "Sign Up"}
          </Button>
        </form>
      </CardContent>
      <ClipLoader
        color="blue"
        loading={isSubmitting}
        size={25}
        className="absolute top-1/2 z-40 left-1/2"
      />
    </Card>
  );
};

export default Signup;
