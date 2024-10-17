"use client";
import SectionWrapper from "@/components/Layout/SectionWrapper";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FormInputWithLabel } from "@/components/FormInput";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAppDispatch } from "@/store/hooks";
import { login } from "@/store/slices/authSlice";

const AdminLoginPage = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const response = await fetch("/api/public/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }
      console.log("response", response);

      const data = await response.json();
      console.log("data", data);

      //   set state
      dispatch(login());

      // Handle successful login
      console.log("Login successful", data);
      // Redirect to admin dashboard or home page
      router.push("/admin");
      toast.success("Login successful");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionWrapper>
      <div className="flex items-center justify-center min-h-screen">
        <Card className="mx-auto w-[400px] rounded-xl">
          <CardHeader className="space-y-1 p-8 pt-10">
            <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
            <CardDescription>Enter Admin credentials to login.</CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-10">
            <form onSubmit={handleSubmit} className="space-y-4">
              <FormInputWithLabel
                label="User Id"
                id="userId"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
              <FormInputWithLabel
                label="Password"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" className="w-full">
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}{" "}
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </SectionWrapper>
  );
};

export default AdminLoginPage;
