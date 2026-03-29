import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import Signin from "@/components/Signin";
import Signup from "@/components/Sigup";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { FadeLoader } from "react-spinners";

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const longLink = searchParams.get("url");
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate(`/dashboard?${longLink ? `url=${longLink}` : ""}`);
    }
  }, [isAuthenticated, navigate, longLink, loading]);

  return (
    <div className="flex items-center justify-center  px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            {searchParams.get("create")
              ? "Hold up! Let's login first 😄"
              : "Login/Signup👋"}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Access your account or create a new one
          </p>
        </div>

        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2 rounded-xl bg-gray-200 dark:bg-gray-800 p-1">
            <TabsTrigger value="signin" className="rounded">
              Sign In
            </TabsTrigger>
            <TabsTrigger value="signup" className="rounded">
              Sign Up
            </TabsTrigger>
          </TabsList>

          <TabsContent value="signin">
            <Signin longLink={longLink} />
          </TabsContent>

          <TabsContent value="signup">
            <Signup />
          </TabsContent>
        </Tabs>

        <p className="text-center text-xs text-gray-400">
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>
      {loading && (
        <div className="absolute backdrop-blur-xs w-full h-screen flex items-center justify-center ">
          <FadeLoader color="#36d7b7" loading={true} size={25} />
        </div>
      )}
    </div>
  );
}
