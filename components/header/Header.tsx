"use client";

import { Bell, Search } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full h-16 bg-gray-100 border-b flex items-center justify-between px-6">

      {/* Left Section */}
      <h1 className="text-xl font-semibold text-black">
        Dashboard
      </h1>

      {/* Right Section */}
      <div className="flex items-center gap-5">

        {/* Search */}
        <div className="flex items-center bg-white px-3 py-1 rounded-md">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none ml-2 text-sm"
          />
        </div>

        {/* Notification */}
        <Bell size={22} className="text-black cursor-pointer" />

        {/* Profile */}
        <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold text-black">
          A
        </div>

      </div>
    </header>
  );
}