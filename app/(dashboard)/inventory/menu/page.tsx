"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

import {
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";

import MenuModal from "@/components/MenuModal";

type Variant = {
  name: string;
  price: number;
};

type MenuItem = {
  id: number;
  name: string;
  category: string;
  type: string;
  variants: Variant[];
  discount: number;
  status: string;
};

export default function MenuPage() {

  const params = useSearchParams();

  // Veg / Non-Veg from URL
  const menuType =
    params.get("type") || "All";

  const [openModal, setOpenModal] =
    useState(false);

  const [editingItem, setEditingItem] =
    useState<MenuItem | null>(null);

  const [categoryFilter, setCategoryFilter] =
    useState("All");

  // Sample Menu Data

  const [menuItems, setMenuItems] =
    useState<MenuItem[]>([

      // VEG

      {
        id: 1,
        name: "Paneer Butter Masala",
        category: "Main Course",
        type: "Veg",
        price: 200,
        discount: 5,
        status: "Available",
      },

      {
        id: 2,
        name: "Veg Fried Rice",
        category: "Main Course",
        type: "Veg",
        price: 160,
        discount: 0,
        status: "Available",
      },

      {
        id: 3,
        name: "Gobi Manchurian",
        category: "Starters",
        type: "Veg",
        price: 150,
        discount: 5,
        status: "Available",
      },

      {
        id: 4,
        name: "Veg Noodles",
        category: "Main Course",
        type: "Veg",
        price: 140,
        discount: 0,
        status: "Available",
      },

      // NON-VEG

      {
        id: 5,
        name: "Chicken Biryani",
        category: "Main Course",
        type: "Non-Veg",
        price: 240,
        discount: 10,
        status: "Available",
      },

      {
        id: 6,
        name: "Chicken 65",
        category: "Starters",
        type: "Non-Veg",
        price: 180,
        discount: 5,
        status: "Available",
      },

      {
        id: 7,
        name: "Mutton Biryani",
        category: "Main Course",
        type: "Non-Veg",
        price: 280,
        discount: 5,
        status: "Available",
      },

      {
        id: 8,
        name: "Fish Fry",
        category: "Starters",
        type: "Non-Veg",
        price: 240,
        discount: 0,
        status: "Available",
      },

    ]);

  // SAVE

  const handleSave = (
    item: MenuItem
  ) => {

    if (editingItem) {

      setMenuItems(
        menuItems.map((m) =>
          m.id === item.id
            ? item
            : m
        )
      );

    } else {

      setMenuItems([
        ...menuItems,
        {
          ...item,
          id: Date.now(),
        },
      ]);

    }

    setOpenModal(false);
    setEditingItem(null);

  };

  // DELETE with confirmation

  const handleDelete = (
    id: number
  ) => {

    const confirmDelete =
      confirm(
        "Are you sure you want to delete this item?"
      );

    if (!confirmDelete) return;

    setMenuItems(
      menuItems.filter(
        (item) =>
          item.id !== id
      )
    );

  };

  // FILTER LOGIC (Clean Version)

  const filteredItems =
    menuItems.filter(
      (item) => {

        const typeMatch =
          menuType === "All" ||
          item.type === menuType;

        const categoryMatch =
          categoryFilter === "All" ||
          item.category === categoryFilter;

        return (
          typeMatch &&
          categoryMatch
        );

      }
    );

  return (

    <div>

      {/* HEADER */}

      <div className="flex justify-between mb-6">

        <h1 className="text-3xl font-bold">

          {menuType === "All"
            ? "All Menu Items"
            : `${menuType} Menu Items`}

        </h1>

        <button
          onClick={() => {

            setEditingItem(null);
            setOpenModal(true);

          }}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >

          <Plus size={18} />

          Add Item

        </button>

      </div>

      {/* CATEGORY TABS */}

      <div className="flex gap-3 mb-5 flex-wrap">

        {[
          "All",
          "Main Course",
          "Starters",
          "Beverages",
          "Desserts",
        ].map((cat) => (

          <button
            key={cat}
            onClick={() =>
              setCategoryFilter(cat)
            }
            className={`px-4 py-2 rounded-full text-sm ${
              categoryFilter === cat
                ? "bg-blue-600 text-white"
                : "bg-white"
            }`}
          >

            {cat}

          </button>

        ))}

      </div>

      {/* TABLE */}

      <div className="bg-white rounded shadow overflow-x-auto mt-4">

        <table className="w-full text-sm">

          <thead>

            <tr >

              <th className="p-3 text-left">
                Item Name
              </th>

              <th className="p-3 text-left">
                Category
              </th>

              <th className="p-3 text-left">
                Type
              </th>

              <th className="p-3 text-left">
                Price
              </th>

              <th className="p-3 text-left">
                Discount %
              </th>

              <th className="p-3 text-left">
                Final Price
              </th>

              <th className="p-3 text-left">
                Status
              </th>

              <th className="p-3 text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredItems.length === 0 && (

              <tr>

                <td
                  colSpan={8}
                  className="text-center p-6 text-gray-500"
                >

                  No menu items found.

                </td>

              </tr>

            )}

            {filteredItems.map(
              (item) => {

                const finalPrice =
                  item.price -
                  (item.price *
                    item.discount) /
                    100;

                return (

                  <tr
                    key={item.id}
                    className=" hover:bg-gray-50"
                  >

                    <td className="p-3 font-medium">

                      {item.name}

                    </td>

                    <td className="p-3">

                      {item.category}

                    </td>

                    <td className="p-3">

                      {item.type}

                    </td>

                    <td className="p-3">

                      ₹{item.price}

                    </td>

                    <td className="p-3">

                      {item.discount}%

                    </td>

                    <td className="p-3 font-semibold text-green-600">

                      ₹{finalPrice}

                    </td>

                    <td className="p-3">

                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">

                        {item.status}

                      </span>

                    </td>

                    {/* ACTION BUTTONS */}

                    <td className="p-3">

                      <div className="flex gap-2">

                        {/* EDIT */}

                        <button
                          onClick={() => {

                            setEditingItem(item);
                            setOpenModal(true);

                          }}
                          className="flex items-center gap-1 px-2 py-1 text-blue-600 hover:bg-blue-50 rounded"
                        >

                          <Pencil size={16} />

                          Edit

                        </button>

                        {/* DELETE */}

                        <button
                          onClick={() =>
                            handleDelete(item.id)
                          }
                          className="flex items-center gap-1 px-2 py-1 text-red-600 hover:bg-red-50 rounded"
                        >

                          <Trash2 size={16} />

                          Delete

                        </button>

                      </div>

                    </td>

                  </tr>

                );

              }
            )}

          </tbody>

        </table>

      </div>

      {/* MODAL */}

      {openModal && (

        <MenuModal
          onClose={() =>
            setOpenModal(false)
          }
          onSave={handleSave}
          editData={editingItem}
        />

      )}

    </div>

  );

}