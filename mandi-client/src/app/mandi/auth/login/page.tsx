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
      password: "",
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const res = await axios.post(
          `http://localhost:8080/api/v1/user/logIn`,
          values
        );
        console.log("auth", res);
        //Save tokens to localStorages
       //localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        router.push("/mandi");
      } catch (err: any) {
        console.log(err);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err?.response?.data?.message });
        helpers.setSubmitting(false);
      }
    },
  });

  const handleMethodChange = (event: any, newValue: any) => {
    setMethod(newValue);
  };
  return (
    <div className=" w-full h-[100vh] flex flex-1 justify-center items-center">
      <div className="mx-auto p-6 md:p-10 mt-10 md:mt-[4rem] bg-sky-700 rounded-md  md:w-2/5 lg:w-2/5 xl:w-2/6">
        <div className="mb-3 ">
          <h4 className="text-2xl font-bold">Login</h4>
          <p className="text-sm text-white mt-2">
            Don't have an account?{" "}
            <Link
              href="/mandi/auth/register"
              className="underline hover:text-blue-500"
            >
              Register
            </Link>
          </p>
        </div>
        <div className="mb-3">
          <div className="mb-3 flex">
            <span
              className={`mr-3 py-2 px-4 rounded cursor-pointer font-bold ${
                method === "email"
                  ? "border-b-2 border-blue-500"
                  : "border-b-2 border-transparent hover:border-gray-400 text-gray-600"
              }`}
              onClick={() => handleMethodChange(null, "email")}
            >
              Email
            </span>
            <span
              className={`py-2 px-4 rounded cursor-pointer font-bold ${
                method === "phoneNumber"
                  ? "border-b-2 border-blue-500"
                  : "border-b-2 border-transparent hover:border-gray-400 text-gray-600"
              }`}
              onClick={() => handleMethodChange(null, "phoneNumber")}
            >
              Phone Number
            </span>
          </div>

          {method === "email" && (
            <form onSubmit={formik.handleSubmit}>
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
                  className="mt-1 p-2 block w-full rounded-md text-black border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="text-sm text-red-500">
                    {formik.errors.password}
                  </p>
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
                Sign In
              </button>
            </form>
          )}
          {method === "phoneNumber" && (
            <div>
              <h6 className="text-xl mb-1">Not available in the demo</h6>
              <p className="text-gray-500">
                To prevent unnecessary costs we disabled this feature in the
                demo.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
