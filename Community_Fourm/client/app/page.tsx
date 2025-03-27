"use client";

import { baseUrl } from "@/constants/BaseUrl";
import ContextHook from "@/context/ContextHook";
import { useRouter } from "next/navigation";

import { useEffect } from "react";

export default function Home() {
  const { token } = ContextHook();
  const router = useRouter();

  const checkToken = async () => {
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

      if (response.status == 401) {
        router.push("/login");
      }
    } catch (error: unknown) {
      console.log(String(error));
      router.replace("/login");
    }
  };

  useEffect(() => {
    if (token) {
      checkToken();
    }
  }, [token]);

  console.log(token);

  return <div>Home</div>;
}
