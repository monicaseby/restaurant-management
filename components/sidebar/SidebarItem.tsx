"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

type Child = {
  name: string;
  path: string;
};

type Props = {
  name: string;
  icon?: any;
  path?: string;
  children?: Child[];
};

export default function SidebarItem({
  name,
  icon: Icon,
  path,
  children,
}: Props) {

  const pathname = usePathname();

  const [open, setOpen] =
    useState(
      pathname.includes("/inventory")
    );

  // 🔽 Dropdown Menu

  if (children) {

    return (

      <div className="w-full">

        {/* Parent */}

        <div
          onClick={() =>
            setOpen(!open)
          }
          className="
            flex
            items-center
            justify-between
            w-full
            px-4
            py-3
            rounded-lg
            hover:bg-gray-100
            cursor-pointer
          "
        >

          <div className="flex items-center gap-3">

            {Icon && <Icon size={20} />}

            <span className="font-medium">

              {name}

            </span>

          </div>

          <ChevronDown
            size={16}
            className={`transition ${
              open ? "rotate-180" : ""
            }`}
          />

        </div>

        {/* Submenu */}

        {open && (

          <div
            className="
              w-full
              flex flex-col
              mt-1
              ml-10
              border-l
              border-gray-200
              pl-3
              px-6
            "
          >

            {children.map((child, i) => (

              <Link
                key={i}
                href={child.path}
                className="
                  w-full
                  block
                  px-6
                  py-2
                  text-sm
                  rounded-md
                  text-gray-600
                  hover:bg-gray-100
                "
              >

                {child.name}

              </Link>

            ))}

          </div>

        )}

      </div>

    );

  }

  // 🔹 Normal Item

  return (

    <Link
      href={path || "#"}
      className={`
        flex
        items-center
        gap-3
        w-full
        px-4
        py-3
        rounded-lg

        ${
          pathname === path
            ? "bg-blue-50 text-blue-600 font-medium"
            : "hover:bg-gray-100"
        }
      `}
    >

      {Icon && <Icon size={20} />}

      <span>{name}</span>

    </Link>

  );

}