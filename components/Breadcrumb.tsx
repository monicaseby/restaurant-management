"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home } from "lucide-react";

export default function Breadcrumb() {

  const pathname = usePathname();

  // Split path
  const segments =
    pathname.split("/").filter(Boolean);

  // Format text
  const formatLabel = (
    text: string
  ) => {

    return text
      .replace("-", " ")
      .replace(/\b\w/g, (c) =>
        c.toUpperCase()
      );

  };

  return (

    <div
      className="
        flex
        items-center
        gap-2
        text-sm
        text-gray-500
        mb-4
      "
    >

      {/* HOME */}

      <Link
        href="/dashboard"
        className="
          flex
          items-center
          gap-1
          font-medium
          text-gray-700
          hover:text-blue-600
        "
      >

        <Home size={16} />

        Home

      </Link>

      {/* SEGMENTS */}

      {segments.map(
        (segment, index) => {

          const href =
            "/" +
            segments
              .slice(0, index + 1)
              .join("/");

          return (

            <div
              key={index}
              className="flex items-center gap-2"
            >

              {/* Separator */}

              <span className="text-gray-400">
                /
              </span>

              {/* Link */}

              <Link
                href={href}
                className="
                  font-medium
                  text-gray-600
                  hover:text-blue-600
                "
              >

                {formatLabel(
                  segment
                )}

              </Link>

            </div>

          );

        }
      )}

    </div>

  );

}