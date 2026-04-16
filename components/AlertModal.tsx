"use client";

import { useState } from "react";

export default function AlertModal({
  open,
  setOpen,
  data,
  setData,
}: any) {

  const [form, setForm] = useState({
    title: "",
    category: "",
    priority: "Medium",
    status: "Active",
  });

  if (!open) return null;

  const handleSave = () => {

    setData([
      ...data,
      {
        id: Date.now(),
        ...form,
        date: new Date().toLocaleDateString(),
      },
    ]);

    setOpen(false);

  };

  return (

    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

      <div className="bg-white p-6 rounded w-96">

        <h3 className="font-semibold mb-4">

          Add Alert

        </h3>

        <input
          placeholder="Title"
          className="border p-2 w-full mb-2"
          onChange={(e) =>
            setForm({
              ...form,
              title: e.target.value,
            })
          }
        />

        <input
          placeholder="Category"
          className="border p-2 w-full mb-2"
          onChange={(e) =>
            setForm({
              ...form,
              category: e.target.value,
            })
          }
        />

        <select
          className="border p-2 w-full mb-2"
          onChange={(e) =>
            setForm({
              ...form,
              priority: e.target.value,
            })
          }
        >

          <option>High</option>
          <option>Medium</option>
          <option>Low</option>

        </select>

        <select
          className="border p-2 w-full mb-4"
          onChange={(e) =>
            setForm({
              ...form,
              status: e.target.value,
            })
          }
        >

          <option>Active</option>
          <option>Resolved</option>

        </select>

        <div className="flex justify-end gap-2">

          <button
            onClick={() => setOpen(false)}
            className="border px-4 py-2 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>

        </div>

      </div>

    </div>

  );

}