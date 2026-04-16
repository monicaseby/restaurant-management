"use client";

import Sidebar from "@/components/sidebar/Sidebar";
import Header from "@/components/header/Header";
import Breadcrumb from "@/components/Breadcrumb";

import {
  MenuFilterProvider
} from "@/context/MenuFilterContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (

    <MenuFilterProvider>

      <div className="flex">

        {/* Sidebar now INSIDE provider */}

        <Sidebar />

        <div className="flex-1 flex flex-col">

          <Header />

          <main className="p-6 bg-gray-100 min-h-screen">
<Breadcrumb />
            {children}

          </main>
          

        </div>
          


      </div>

    </MenuFilterProvider>

  );

}