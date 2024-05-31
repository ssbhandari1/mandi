"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
const page = () => {
  const [method, setMethod] = useState("email");

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      gender: "",
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      username: Yup.string().max(255).required("Name is required"),
      password: Yup.string().max(255).required("Password is required"),
      gender: Yup.string().max(255).required("Gender is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const res = await axios.post(
          `http://localhost:8080/api/v1/user/new`,
          values
        );
        console.log("mmjjjjjjj", res);
        router.push("/mandi/auth/login");
      } catch (err: any) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  const handleMethodChange = (event: any, newValue: any) => {
    setMethod(newValue);
  };
  return (
    <div className="bg-gray-50  w-full h-[100vh] flex flex-1 justify-center items-center text-white">
      <div className="mx-auto p-6 md:p-10 mt-10 md:mt-[4rem] bg-sky-700 rounded-md  md:w-2/5 lg:w-2/5 xl:w-2/6">
        <div className="mb-3 ">
          <h4 className="text-2xl font-bold py-2">Sign Up</h4>
          <p className="text-sm text-white">
            Already have an account?{" "}
            <Link
              href="/mandi/auth/login"
              className="underline hover:text-blue-500"
            >
              Sign In
            </Link>
          </p>
        </div>
        <div className="mb-3" id="registerUser">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="username"
                id="username"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 p-2 block w-full text-black rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {formik.touched.username && formik.errors.username && (
                <p className="text-sm text-red-500">{formik.errors.username}</p>
              )}
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 p-2 block w-full text-black rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-sm text-red-500">{formik.errors.email}</p>
              )}
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 p-2 block w-full text-black rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-sm text-red-500">{formik.errors.password}</p>
              )}
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <input
                type="gender"
                id="gender"
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 p-2 block w-full text-black rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {formik.touched.gender && formik.errors.gender && (
                <p className="text-sm text-red-500">{formik.errors.gender}</p>
              )}
            </div>
            {formik.errors.submit && (
              <p className="text-sm text-red-500 mt-3">
                {formik.errors.submit}
              </p>
            )}
            <button
              type="submit"
              className="mt-3 py-2 px-4 bg-green-400 text-white rounded-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
