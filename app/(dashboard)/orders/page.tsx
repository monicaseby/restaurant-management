"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Edit,
  Trash2,
  Plus,
} from "lucide-react";

type OrderStatus =
  | "Pending"
  | "Preparing"
  | "Served";

type Order = {
  id: number;
  table: number;
  items: any[];
  total: number;
  status: OrderStatus;
};

export default function OrdersPage() {

  const [orders, setOrders] =
    useState<Order[]>([]);

  const [editOrder, setEditOrder] =
    useState<Order | null>(null);

  const [deleteId, setDeleteId] =
    useState<number | null>(null);

  // DEFAULT ORDERS

  const defaultOrders: Order[] = [

    {
      id: 101,
      table: 1,
      items: [{ name: "Paneer", qty: 1 }],
      total: 520,
      status: "Pending",
    },

    {
      id: 102,
      table: 3,
      items: [{ name: "Biryani", qty: 2 }],
      total: 480,
      status: "Preparing",
    },

    {
      id: 103,
      table: 5,
      items: [{ name: "Fish Fry", qty: 1 }],
      total: 390,
      status: "Served",
    },

  ];

  // LOAD ORDERS

  useEffect(() => {

    const stored =
      localStorage.getItem("orders");

    if (!stored) {

      localStorage.setItem(
        "orders",
        JSON.stringify(defaultOrders)
      );

      setOrders(defaultOrders);

    } else {

      setOrders(JSON.parse(stored));

    }

  }, []);

  // SAVE EDIT

  const handleUpdateOrder = () => {

    if (!editOrder) return;

    const updated =
      orders.map((o) =>
        o.id === editOrder.id
          ? editOrder
          : o
      );

    setOrders(updated);

    localStorage.setItem(
      "orders",
      JSON.stringify(updated)
    );

    setEditOrder(null);

  };

  // DELETE ORDER

  const confirmDelete = () => {

    if (!deleteId) return;

    const updated =
      orders.filter(
        (o) =>
          o.id !== deleteId
      );

    setOrders(updated);

    localStorage.setItem(
      "orders",
      JSON.stringify(updated)
    );

    setDeleteId(null);

  };

  return (

    <div className="space-y-6">

      {/* HEADER */}

      <div className="flex justify-between items-center">

        <h1 className="text-3xl font-bold">

          Orders

        </h1>

        <Link
          href="/orders/create"
          className="
            flex items-center gap-2
            bg-blue-600
            text-white
            px-4 py-2
            my-2
            rounded-lg
            shadow-sm
            hover:bg-blue-700
          "
        >

          <Plus size={16} />

          Create Order

        </Link>

      </div>

      {/* TABLE */}

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden my-2">

        <table className="w-full">

          <thead className="bg-gray-50">

            <tr>

              <th className="p-4 text-left">
                Order ID
              </th>

              <th className="p-4 text-left">
                Table
              </th>

              <th className="p-4 text-left">
                Items
              </th>

              <th className="p-4 text-left">
                Total
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {orders.map((order) => (

              <tr
                key={order.id}
                className="border-t hover:bg-gray-50"
              >

                <td className="p-4 font-medium">

                  #{order.id}

                </td>

                <td className="p-4">

                  Table {order.table}

                </td>

                <td className="p-4">

                  {order.items.length} Items

                </td>

                <td className="p-4 font-semibold text-green-600">

                  ₹{order.total}

                </td>

                <td className="p-4">

                  {order.status}

                </td>

                <td className="p-4">

                  <div className="flex gap-2">

                    {/* EDIT */}

                    <button
                      onClick={() =>
                        setEditOrder(order)
                      }
                      className="
                        p-2
                        rounded-lg
                        border border-gray-200
                        hover:bg-blue-50
                      "
                    >

                      <Edit size={16} />

                    </button>

                    {/* DELETE */}

                    <button
                      onClick={() =>
                        setDeleteId(order.id)
                      }
                      className="
                        p-2
                        rounded-lg
                        border border-gray-200
                        hover:bg-red-50
                      "
                    >

                      <Trash2 size={16} />

                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* EDIT MODAL */}

      {editOrder && (

        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">

          <div className="bg-white w-full max-w-md rounded-xl shadow-xl border border-gray-200 p-6 space-y-4">

            <h2 className="text-lg font-semibold">

              Edit Order

            </h2>

            {/* TABLE */}

            <div>

              <label className="text-sm font-medium">

                Table

              </label>

              <select
                value={editOrder.table}
                onChange={(e) =>
                  setEditOrder({
                    ...editOrder,
                    table: Number(
                      e.target.value
                    ),
                  })
                }
                className="
                  mt-1
                  w-full
                  border border-gray-200
                  rounded-lg
                  px-3 py-2
                "
              >

                {[1,2,3,4,5,6,7,8].map((t) => (

                  <option key={t} value={t}>

                    Table {t}

                  </option>

                ))}

              </select>

            </div>

            {/* STATUS */}

            <div>

              <label className="text-sm font-medium">

                Status

              </label>

              <select
                value={editOrder.status}
                onChange={(e) =>
                  setEditOrder({
                    ...editOrder,
                    status:
                      e.target
                        .value as OrderStatus,
                  })
                }
                className="
                  mt-1
                  w-full
                  border border-gray-200
                  rounded-lg
                  px-3 py-2
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

            {/* BUTTONS */}

            <div className="flex justify-end gap-3 pt-4">

              <button
                onClick={() =>
                  setEditOrder(null)
                }
                className="
                  px-4 py-2
                  border border-gray-200
                  rounded-lg
                  hover:bg-gray-100
                "
              >

                Cancel

              </button>

              <button
                onClick={handleUpdateOrder}
                className="
                  px-4 py-2
                  bg-blue-600
                  text-white
                  rounded-lg
                  hover:bg-blue-700
                "
              >

                Update

              </button>

            </div>

          </div>

        </div>

      )}

      {/* DELETE MODAL */}

      {deleteId && (

        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">

          <div className="bg-white w-full max-w-sm rounded-xl shadow-xl border border-gray-200 p-6 space-y-4">

            <h2 className="text-lg font-semibold">

              Delete Order

            </h2>

            <p className="text-gray-600 text-sm">

              Are you sure you want to delete this order?

            </p>

            <div className="flex justify-end gap-3 pt-3">

              <button
                onClick={() =>
                  setDeleteId(null)
                }
                className="
                  px-4 py-2
                  border border-gray-200
                  rounded-lg
                  hover:bg-gray-100
                "
              >

                Cancel

              </button>

              <button
                onClick={confirmDelete}
                className="
                  px-4 py-2
                  bg-red-600
                  text-white
                  rounded-lg
                  hover:bg-red-700
                "
              >

                Delete

              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}