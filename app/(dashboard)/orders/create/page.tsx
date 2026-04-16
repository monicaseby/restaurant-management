"use client";

import { useState } from "react";
import {
  Plus,
  Minus,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";

type MenuItem = {
  id: number;
  name: string;
  price: number;
};

type CartItem = MenuItem & {
  quantity: number;
};

export default function CreateOrderPage() {

  const router = useRouter();

  // FULL MENU ITEMS

  const menuItems: MenuItem[] = [

    { id: 1, name: "Paneer Butter Masala", price: 220 },
    { id: 2, name: "Veg Fried Rice", price: 160 },
    { id: 3, name: "Gobi Manchurian", price: 150 },
    { id: 4, name: "Veg Noodles", price: 170 },
    { id: 5, name: "Masala Dosa", price: 90 },

    { id: 6, name: "Chicken Biryani", price: 240 },
    { id: 7, name: "Fish Fry", price: 260 },
    { id: 8, name: "Chicken Curry", price: 230 },
    { id: 9, name: "Egg Curry", price: 140 },
    { id: 10, name: "Chicken Noodles", price: 200 },

  ];

  const [table, setTable] =
    useState(1);

  const [cart, setCart] =
    useState<CartItem[]>([]);

  // ADD ITEM

  const addItem = (item: MenuItem) => {

    const exists =
      cart.find(
        (c) =>
          c.id === item.id
      );

    if (exists) {

      setCart(
        cart.map((c) =>
          c.id === item.id
            ? {
                ...c,
                quantity:
                  c.quantity + 1,
              }
            : c
        )
      );

    } else {

      setCart([
        ...cart,
        {
          ...item,
          quantity: 1,
        },
      ]);

    }

  };

  // QTY

  const increaseQty = (id: number) => {

    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                item.quantity + 1,
            }
          : item
      )
    );

  };

  const decreaseQty = (id: number) => {

    setCart(
      cart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity:
                  item.quantity - 1,
              }
            : item
        )
        .filter(
          (item) =>
            item.quantity > 0
        )
    );

  };

  const removeItem = (id: number) => {

    setCart(
      cart.filter(
        (item) =>
          item.id !== id
      )
    );

  };

  const total =
    cart.reduce(
      (sum, item) =>
        sum +
        item.price *
          item.quantity,
      0
    );

  // CREATE ORDER

  const handleCreateOrder =
    () => {

      if (cart.length === 0) {

        alert("Add items first");
        return;

      }

      const existing =
        JSON.parse(
          localStorage.getItem(
            "orders"
          ) || "[]"
        );

      const newOrder = {

        id: Date.now(),

        table,

        items: cart,

        total,

        status: "Pending",

      };

      localStorage.setItem(
        "orders",
        JSON.stringify([
          ...existing,
          newOrder,
        ])
      );

      router.push("/orders");

    };

  return (

    <div className="grid grid-cols-3 gap-6 h-[calc(100vh-120px)]">

      {/* MENU */}

      <div className="col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col">

        <h2 className="text-xl font-semibold mb-4">

          Menu Items

        </h2>

        <div className="grid grid-cols-2 gap-4 overflow-y-auto pr-2">

          {menuItems.map(
            (item) => (

              <div
                key={item.id}
                className="
                  border
                  border-gray-200
                  rounded-lg
                  p-4
                  flex
                  justify-between
                  items-center
                  hover:shadow-sm
                "
              >

                <div>

                  <p className="font-medium">

                    {item.name}

                  </p>

                  <p className="text-green-600 font-semibold">

                    ₹{item.price}

                  </p>

                </div>

                <button
                  onClick={() =>
                    addItem(item)
                  }
                  className="
                    bg-blue-600
                    text-white
                    p-2
                    rounded-lg
                    hover:bg-blue-700
                  "
                >

                  <Plus size={16} />

                </button>

              </div>

            )
          )}

        </div>

      </div>

      {/* SUMMARY */}

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col">

        <h2 className="font-semibold mb-4">

          Order Summary

        </h2>

        <div className="flex-1 space-y-3 overflow-y-auto">

          {cart.map(
            (item) => (

              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-2"
              >

                <div>

                  <p className="font-medium">

                    {item.name}

                  </p>

                  <p className="text-sm text-gray-500">

                    ₹{item.price}
                  </p>

                </div>

                <div className="flex items-center gap-2">

                  <button
                    onClick={() =>
                      decreaseQty(item.id)
                    }
                    className="p-1 bg-gray-200 rounded"
                  >

                    <Minus size={14} />

                  </button>

                  <span>

                    {item.quantity}

                  </span>

                  <button
                    onClick={() =>
                      increaseQty(item.id)
                    }
                    className="p-1 bg-gray-200 rounded"
                  >

                    <Plus size={14} />

                  </button>

                  <button
                    onClick={() =>
                      removeItem(item.id)
                    }
                    className="text-red-600"
                  >

                    <Trash2 size={16} />

                  </button>

                </div>

              </div>

            )
          )}

        </div>

        <div className="border-t pt-4 mt-4">

          <div className="flex justify-between font-bold text-lg">

            <span>Total</span>

            <span className="text-green-600">

              ₹{total}

            </span>

          </div>

          <button
            onClick={handleCreateOrder}
            className="
              w-full
              mt-4
              bg-green-600
              text-white
              py-2
              rounded-lg
              hover:bg-green-700
            "
          >

            Create Order

          </button>

        </div>

      </div>

    </div>

  );

}