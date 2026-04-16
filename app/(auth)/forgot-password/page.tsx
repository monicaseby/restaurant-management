"use client";

import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {

  const [email,setEmail] = useState("");
  const [error,setError] = useState("");
  const [success,setSuccess] = useState("");

  const validate = () => {

    if(!email){
      setError("Email is required");
      return false;
    }

    if(!/\S+@\S+\.\S+/.test(email)){
      setError("Enter a valid email");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit=(e:any)=>{
    e.preventDefault();

    if(validate()){
      setSuccess("Password reset link sent to your email.");
      setEmail("");
    }
  };

  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-md">

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Forgot Password
        </h2>

        <p className="text-gray-500 mb-6">
          Enter your email to reset your password
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>

            <label className="text-gray-700 text-sm font-medium">
              Email <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full mt-1 border border-gray-200 p-3 rounded-md text-gray-800 focus:ring-1 focus:ring-gray-300"
            />

            <p className="text-red-500 text-sm">{error}</p>

          </div>

          {success && (
            <p className="text-green-600 text-sm">{success}</p>
          )}

          <button className="w-full bg-gray-800 text-white py-3 rounded-md hover:bg-black">
            Send Reset Link
          </button>

        </form>

        <p className="text-sm text-gray-600 text-center mt-6">
          Remember your password?{" "}
          <Link href="/login" className="text-black font-semibold">
            Login
          </Link>
        </p>

      </div>

    </div>

  );
}