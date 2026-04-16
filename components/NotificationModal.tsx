"use client";

import { useState, useEffect } from "react";

type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
  editItem: any;
  data: any[];
  setData: any;
};

export default function NotificationModal({
  open,
  setOpen,
  editItem,
  data,
  setData,
}: Props) {

  const [form, setForm] = useState({
    message: "",
    type: "",
    date: "",
    status: "Unread",
  });

  useEffect(() => {

    if (editItem) {

      setForm(editItem);

    } else {

      setForm({
        message: "",
        type: "",
        date: "",
        status: "Unread",
      });

    }

  }, [editItem]);

  if (!open) return null;

  // SAVE

  const handleSave = () => {

    if (editItem) {

      setData(
        data.map((d) =>
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

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div className="bg-white p-6 rounded w-96">

        <h3 className="font-semibold mb-4">

          {editItem
            ? "Edit Notification"
            : "Add Notification"}

        </h3>

        <input
          placeholder="Message"
          className="border p-2 w-full mb-2"
          value={form.message}
          onChange={(e) =>
            setForm({
              ...form,
              message: e.target.value,
            })
          }
        />

        <input
          placeholder="Type"
          className="border p-2 w-full mb-2"
          value={form.type}
          onChange={(e) =>
            setForm({
              ...form,
              type: e.target.value,
            })
          }
        />

        <input
          type="date"
          className="border p-2 w-full mb-2"
          value={form.date}
          onChange={(e) =>
            setForm({
              ...form,
              date: e.target.value,
            })
          }
        />

        <select
          className="border p-2 w-full mb-4"
          value={form.status}
          onChange={(e) =>
            setForm({
              ...form,
              status: e.target.value,
            })
          }
        >

          <option>Unread</option>
          <option>Read</option>

        </select>

        <div className="flex justify-end gap-2">

          <button
            onClick={() => setOpen(false)}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </button>

        </div>

      </div>

    </div>

  );

}