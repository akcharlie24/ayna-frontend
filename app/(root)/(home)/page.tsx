"use client";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

const Home = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      location.replace("/sign-in");
    }
  });

  return (
    <div className="flex w-2/3 flex-col items-center justify-center text-4xl italic">
      <p>Open </p>
      <p>or</p>
      <p>Create a New Chat</p>
    </div>
  );
};

export default Home;
