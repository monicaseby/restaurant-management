"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

export default function OrderDetailsPage() {

  const params = useParams();

  const orderId = params.id;

  const [status, setStatus] =
    useState("Pending");

  return (

    <div>

      <h1 className="text-2xl font-bold mb-6">

        Order #{orderId}

      </h1>

      {/* Status */}

      <div className="mb-6">

        <label className="mr-2">

          Status:

        </label>

        <select
          value={status}
          onChange={(e) =>
            setStatus(
              e.target.value
            )
          }
          className="
            border
            px-3
            py-2
            rounded
          "
        >

          <option>
            Pending
          </option>

          <option>
            Preparing
          </option>

          <option>
            Served
          </option>

        </select>

      </div>

      {/* Items */}

      <div className="bg-white p-4 rounded shadow">

        <h2 className="font-semibold mb-3">

          Items

        </h2>

        <div className="flex justify-between">

          <span>
            Paneer Butter Masala
          </span>

          <span>
            ₹200
          </span>

        </div>

        <div className="flex justify-between">

          <span>
            Veg Fried Rice
          </span>

          <span>
            ₹160
          </span>

        </div>

        <div className="mt-3 font-bold">

          Total: ₹360

        </div>

      </div>

    </div>

  );

}