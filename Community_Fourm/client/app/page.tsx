"use client";

import { baseUrl } from "@/constants/BaseUrl";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import Articles from "./components/Articles";
import Navbar from "./components/Navbar";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);

  const checkToken = async (token: string) => {
    try {
      const response = await fetch(`${baseUrl}users/verify/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
        }),
      });

      if (response.status === 401) {
        router.push("/login");
      }
    } catch (error: unknown) {
      console.log(String(error));
      router.replace("/login");
    }
  };

  useEffect(() => {
    const getToken = localStorage.getItem("access_token");
    if (!getToken) {
      router.replace("/login");
      return;
    }
    checkToken(getToken).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <Articles />
    </div>
  );
}
