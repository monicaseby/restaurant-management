"use client";

import { useState, useEffect } from "react";

type MenuItem = {
  id?: number;
  name: string;
  category: string;
  type: string;
  price: number;
  discount: number;
  finalPrice: number;
  status: string;
};

export default function MenuModal({
  onClose,
  onSave,
  editData,
}: {
  onClose: () => void;
  onSave: (item: MenuItem) => void;
  editData: MenuItem | null;
}) {

  // FORM STATE

  const [form, setForm] =
    useState<MenuItem>({

      name: "",
      category: "",
      type: "Veg",

      price: 0,
      discount: 0,
      finalPrice: 0,

      status: "Available",

    });

  const [errors, setErrors] =
    useState<any>({});

  // LOAD EDIT DATA

  useEffect(() => {

    if (editData) {

      setForm({

        ...editData,

        price:
          editData.price || 0,

        discount:
          editData.discount || 0,

        finalPrice:
          editData.finalPrice || 0,

      });

    }

  }, [editData]);

  // AUTO FINAL PRICE CALCULATION

  useEffect(() => {

    const price =
      Number(form.price) || 0;

    const discount =
      Number(form.discount) || 0;

    const final =
      price -
      (price * discount) / 100;

    setForm((prev) => ({

      ...prev,

      finalPrice:
        Number(final.toFixed(2)),

    }));

  }, [
    form.price,
    form.discount,
  ]);

  // VALIDATION

  const validate = () => {

    let newErrors: any = {};

    if (!form.name.trim())
      newErrors.name =
        "Item name required";

    if (!form.category)
      newErrors.category =
        "Category required";

    if (!form.price)
      newErrors.price =
        "Price required";

    setErrors(newErrors);

    return (
      Object.keys(newErrors)
        .length === 0
    );

  };

  // SAVE

  const handleSubmit = () => {

    if (!validate()) return;

    onSave(form);

  };

  return (

    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white w-[600px] rounded-lg p-6 shadow-lg">

        {/* TITLE */}

        <h2 className="text-xl font-semibold mb-5">

          {editData
            ? "Edit Menu Item"
            : "Add Menu Item"}

        </h2>

        {/* ITEM NAME */}

        <div className="mb-4">

          <label className="block text-sm font-medium mb-1">

            Item Name

          </label>

          <input
            type="text"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            className="border w-full px-3 py-2 rounded"
          />

          {errors.name && (

            <p className="text-red-500 text-sm mt-1">

              {errors.name}

            </p>

          )}

        </div>

        {/* CATEGORY */}

        <div className="mb-4">

          <label className="block text-sm font-medium mb-1">

            Category

          </label>

          <select
            value={form.category}
            onChange={(e) =>
              setForm({
                ...form,
                category:
                  e.target.value,
              })
            }
            className="border w-full px-3 py-2 rounded"
          >

            <option value="">
              Select Category
            </option>

            <option>
              Starters
            </option>

            <option>
              Main Course
            </option>

            <option>
              Desserts
            </option>

          </select>

          {errors.category && (

            <p className="text-red-500 text-sm mt-1">

              {errors.category}

            </p>

          )}

        </div>

        {/* TYPE */}

        <div className="mb-4">

          <label className="block text-sm font-medium mb-1">

            Type

          </label>

          <select
            value={form.type}
            onChange={(e) =>
              setForm({
                ...form,
                type:
                  e.target.value,
              })
            }
            className="border w-full px-3 py-2 rounded"
          >

            <option>
              Veg
            </option>

            <option>
              Non-Veg
            </option>

          </select>

        </div>

        {/* PRICE + DISCOUNT */}

        <div className="grid grid-cols-2 gap-4 mb-4">

          {/* PRICE */}

          <div>

            <label className="block text-sm font-medium mb-1">

              Price

            </label>

            <input
              type="number"
              value={form.price}
              onChange={(e) =>
                setForm({
                  ...form,
                  price:
                    Number(
                      e.target.value
                    ),
                })
              }
              className="border w-full px-3 py-2 rounded"
            />

            {errors.price && (

              <p className="text-red-500 text-sm mt-1">

                {errors.price}

              </p>

            )}

          </div>

          {/* DISCOUNT */}

          <div>

            <label className="block text-sm font-medium mb-1">

              Discount %

            </label>

            <input
              type="number"
              value={form.discount}
              onChange={(e) =>
                setForm({
                  ...form,
                  discount:
                    Number(
                      e.target.value
                    ),
                })
              }
              className="border w-full px-3 py-2 rounded"
            />

          </div>

        </div>

        {/* FINAL PRICE */}

        <div className="mb-4">

          <label className="block text-sm font-medium mb-1">

            Final Price

          </label>

          <input
            type="number"
            value={form.finalPrice}
            readOnly
            className="border w-full px-3 py-2 rounded bg-gray-100"
          />

        </div>

        {/* STATUS */}

        <div className="mb-5">

          <label className="block text-sm font-medium mb-1">

            Status

          </label>

          <select
            value={form.status}
            onChange={(e) =>
              setForm({
                ...form,
                status:
                  e.target.value,
              })
            }
            className="border w-full px-3 py-2 rounded"
          >

            <option>
              Available
            </option>

            <option>
              Out of Stock
            </option>

          </select>

        </div>

        {/* BUTTONS */}

        <div className="flex justify-end gap-3 mt-4">

          <button
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >

            Cancel

          </button>

          <button
            onClick={handleSubmit}
            className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >

            Save Item

          </button>

        </div>

      </div>

    </div>

  );

}