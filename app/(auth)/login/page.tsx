"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {

  const [form,setForm] = useState({
    email:"",
    password:""
  });

  const [errors,setErrors] = useState<any>({});

  const validateField = (name:string,value:string) => {

    let error="";

    if(name==="email"){
      if(!value) error="Email is required";
      else if(!/\S+@\S+\.\S+/.test(value))
        error="Enter a valid email";
    }

    if(name==="password"){
      if(!value) error="Password is required";
    }

    setErrors((prev:any)=>({
      ...prev,
      [name]:error
    }));

  };

  const handleChange=(e:any)=>{

    const {name,value}=e.target;

    setForm({
      ...form,
      [name]:value
    });

    validateField(name,value);

  };

  const handleSubmit=(e:any)=>{
    e.preventDefault();
    console.log(form);
  };

  return(

    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-md">

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* EMAIL */}

          <div>

            <label className="text-sm text-gray-700">
              Email <span className="text-red-500">*</span>
            </label>

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full mt-1 border border-gray-200 p-3 rounded-md text-gray-800"
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
              className="w-full mt-1 border border-gray-200 p-3 rounded-md text-gray-800"
            />

            <p className="text-red-500 text-sm">{errors.password}</p>

          </div>

          <div className="flex justify-end text-sm">

            <Link href="/forgot-password" className="text-gray-600">
              Forgot password?
            </Link>

          </div>

          <button className="w-full bg-gray-800 text-white py-3 rounded-md">
            Login
          </button>

        </form>

        <p className="text-sm text-gray-600 text-center mt-6">

          New user?{" "}
          <Link href="/register" className="text-black font-semibold">
            Sign Up
          </Link>

        </p>

      </div>

    </div>
  );
}