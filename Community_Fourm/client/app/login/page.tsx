"use client";
import { baseUrl } from "@/constants/BaseUrl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch(`${baseUrl}users/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      if (response.status === 201) {
        toast.success(data.message);
        router.push("/");
      } else {
        toast.error(data.message);
      }
    } catch (error: unknown) {
      toast.error(String(error));
    }
  };

  return (
    <div className="">
      <div className="flex justify-center mt-10">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 border border-gray-400 rounded shadow-md px-20 py-28 hover:shadow-xl hover:cursor-pointer"
        >
          <h1 className="font-bold text-3xl">Login</h1>
          <input
            placeholder="Enter your email"
            className="border border-gray-500 rounded w-full px-2 py-1"
            name="email"
            onChange={handleChange}
          />
          <input
            placeholder="Enter password"
            className="border border-gray-500 rounded w-full px-2 py-1"
            name="password"
            onChange={handleChange}
          />
          <p>
            Dont have an account?{" "}
            <Link
              href={"/signup"}
              className="text-blue-500 hover:cursor-pointer"
            >
              Register
            </Link>
          </p>
          <button type="submit" className="bg-red-500 rounded py-1 text-white">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
