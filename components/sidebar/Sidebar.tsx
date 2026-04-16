"use client";

import SidebarItem from "./SidebarItem";
import { sidebarMenu } from "./SidebarData";

export default function Sidebar() {

  return (

    <div className="w-64 h-screen bg-white p-4 flex flex-col">

      {/* Logo */}

      <div className="mb-10">

        <h1 className="text-2xl text-black font-bold">

          🍽 Restaurant

        </h1>

      </div>

      {/* Menu */}

      <div className="flex flex-col gap-2 w-full">

        {sidebarMenu.map((item, index) => (

          <SidebarItem
            key={index}
            name={item.name}
            icon={item.icon}
            path={item.path}
            children={item.children}
          />

        ))}

      </div>

    </div>

  );

}