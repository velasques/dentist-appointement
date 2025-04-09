"use client";
import React, { useState } from "react";
import Select from "@/components/Select";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import axios from "axios";

const Admin = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "admin@dental.com",
    password: "Dental@123",
  });
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const t = useTranslations("admin");

  const loginHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://api-dental.molaraiche.com/api/admin/login`,
        { email: form.email, password: form.password }
      );
      const { token } = await response.data;
     
      Cookies.set("token", token, {
        expires: 30,
        secure: true,
        sameSite: "Strict",
      });
      router.push("/admin/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  return (
    <section className='admin h-screen flex justify-center items-center w-full flex-col font-poppins'>
      <div className=''>
        <Select />
      </div>
      <div className='flex items-center justify-center my-10'>
        <h1 className='text-5xl font-bold text-secondary text-center'>
          {t("title")}
        </h1>
      </div>
      <form
        onSubmit={loginHandler}
        className='bg-white/30 backdrop-blur-lg p-8 rounded-lg shadow-lg w-[90%] md:w-[40%]'>
        <div className='mb-4'>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-secondary'>
            {t("email")}
          </label>
          <input
            id='email'
            name='email'
            onChange={changeHandler}
            value={form.email}
            placeholder=''
            type='email'
            className='mt-1 block w-full p-2 border border-gray-300 text-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-sky-blue-design outline-none'
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='password'
            className='block text-sm font-medium text-secondary'>
            {t("password")}
          </label>
          <input
            id='password'
            name='password'
            onChange={changeHandler}
            value={form.password}
            type='password'
            className='mt-1 block w-full p-2 border border-gray-300 text-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-sky-blue-design outline-none'
          />
        </div>
        <div className='flex items-center justify-center gap-4 mt-5'>
          <Link
            href='/'
            className='bg-dark-blue-design  text-secondary px-4 py-2 rounded hover:opacity-80 cursor-pointer'>
            Back
          </Link>
          <button
            type='submit'
            className='px-4 py-2 curosr-pointer bg-sky-blue-design text-white rounded hover:opacity-80 cursor-pointer'>
            {t("submit")}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Admin;
