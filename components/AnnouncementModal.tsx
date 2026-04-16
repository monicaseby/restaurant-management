"use client";

import { useState, useEffect } from "react";

export default function AnnouncementModal({
  open,
  setOpen,
  editItem,
  data,
  setData,
}: any) {

  const [form, setForm] = useState({
    title: "",
    audience: "",
    date: "",
  });

  useEffect(() => {

    if (editItem) {

      setForm(editItem);

    }

  }, [editItem]);

  if (!open) return null;

  const handleSave = () => {

    if (editItem) {

      setData(
        data.map((d: any) =>
          d.id === editItem.id
            ? form
            : d
        )
      );

    } else {

      setData([
        ...data,
        {
          id: Date.now(),
          ...form,
        },
      ]);

    }

    setOpen(false);

  };

  return (

    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

      <div className="bg-white p-6 rounded w-96">

        <h3 className="font-semibold mb-4">

          Announcement

        </h3>

        <input
          placeholder="Title"
          className="border p-2 w-full mb-2"
          value={form.title}
          onChange={(e) =>
            setForm({
              ...form,
              title: e.target.value,
            })
          }
        />

        <input
          placeholder="Audience"
          className="border p-2 w-full mb-2"
          value={form.audience}
          onChange={(e) =>
            setForm({
              ...form,
              audience: e.target.value,
            })
          }
        />

        <input
          type="date"
          className="border p-2 w-full mb-4"
          value={form.date}
          onChange={(e) =>
            setForm({
              ...form,
              date: e.target.value,
            })
          }
        />

        <div className="flex justify-end gap-2">

          <button
            onClick={() => setOpen(false)}
            className="border px-4 py-2 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>

        </div>

      </div>

    </div>

  );

}