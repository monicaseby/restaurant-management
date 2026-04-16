"use client";

import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState<any>({});

  const validateField = (name: string, value: string) => {

    let error = "";

    if (name === "firstname") {
      if (!value.trim()) error = "First name is required";
    }

    if (name === "lastname") {
      if (!value.trim()) error = "Last name is required";
    }

    if (name === "phone") {
      if (!value) error = "Phone number is required";
      else if (!/^[0-9]{10}$/.test(value))
        error = "Enter a valid 10 digit phone number";
    }

    if (name === "email") {
      if (!value) error = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(value))
        error = "Enter a valid email address";
    }

    if (name === "password") {
      if (!value) error = "Password is required";
      else if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(value)
      ) {
        error =
          "Password must contain 8 characters, uppercase, lowercase, number and special character";
      }
    }

    if (name === "confirmPassword") {
      if (!value) error = "Confirm your password";
      else if (value !== form.password)
        error = "Passwords do not match";
    }

    setErrors((prev: any) => ({
      ...prev,
      [name]: error
    }));
  };

  const handleChange = (e: any) => {

    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value
    });

    validateField(name, value);
  };

  const handleSubmit = (e: any) => {

    e.preventDefault();

    Object.entries(form).forEach(([key, value]) =>
      validateField(key, value as string)
    );

    const hasErrors = Object.values(errors).some((err) => err !== "");

    if (!hasErrors) {
      console.log("User Registered:", form);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-2xl">

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Register
        </h2>

        <p className="text-gray-500 mb-6">
          Create your account
        </p>

        <form onSubmit={handleSubmit}>

          <div className="grid grid-cols-2 gap-4">

            {/* FIRST NAME */}
            <div>
              <label className="text-sm text-gray-700">
                First Name <span className="text-red-500">*</span>
              </label>

              <input
                name="firstname"
                value={form.firstname}
                onChange={handleChange}
                className={`w-full mt-1 p-3 rounded-md border ${
                  errors.firstname ? "border-red-400" : "border-gray-200"
                } text-gray-800`}
              />

              <p className="text-red-500 text-sm">{errors.firstname}</p>
            </div>

            {/* LAST NAME */}
            <div>
              <label className="text-sm text-gray-700">
                Last Name <span className="text-red-500">*</span>
              </label>

              <input
                name="lastname"
                value={form.lastname}
                onChange={handleChange}
                className={`w-full mt-1 p-3 rounded-md border ${
                  errors.lastname ? "border-red-400" : "border-gray-200"
                } text-gray-800`}
              />

              <p className="text-red-500 text-sm">{errors.lastname}</p>
            </div>

            {/* PHONE */}
            <div>
              <label className="text-sm text-gray-700">
                Phone <span className="text-red-500">*</span>
              </label>

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className={`w-full mt-1 p-3 rounded-md border ${
                  errors.phone ? "border-red-400" : "border-gray-200"
                } text-gray-800`}
              />

              <p className="text-red-500 text-sm">{errors.phone}</p>
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-sm text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>

              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                className={`w-full mt-1 p-3 rounded-md border ${
                  errors.email ? "border-red-400" : "border-gray-200"
                } text-gray-800`}
              />

              <p className="text-red-500 text-sm">{errors.email}</p>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm text-gray-700">
                Password <span className="text-red-500">*</span>
              </label>

              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className={`w-full mt-1 p-3 rounded-md border ${
                  errors.password ? "border-red-400" : "border-gray-200"
                } text-gray-800`}
              />

              <p className="text-red-500 text-sm">{errors.password}</p>
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="text-sm text-gray-700">
                Confirm Password <span className="text-red-500">*</span>
              </label>

              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className={`w-full mt-1 p-3 rounded-md border ${
                  errors.confirmPassword ? "border-red-400" : "border-gray-200"
                } text-gray-800`}
              />

              <p className="text-red-500 text-sm">
                {errors.confirmPassword}
              </p>
            </div>

          </div>

          <button className="w-full mt-6 bg-gray-800 text-white py-3 rounded-md hover:bg-black transition">
            Register
          </button>

        </form>

        <p className="text-sm text-gray-600 text-center mt-6">
          Already signed in?{" "}
          <Link href="/login" className="text-black font-semibold">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}