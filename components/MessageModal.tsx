"use client";

import { useState } from "react";

export default function MessageModal({
  open,
  setOpen,
  data,
  setData,
}: any) {

  const [form, setForm] = useState({
    sender: "",
    receiver: "",
    message: "",
  });

  if (!open) return null;

  const handleSend = () => {

    setData([
      ...data,
      {
        id: Date.now(),
        ...form,
      },
    ]);

    setOpen(false);

  };

  return (

    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

      <div className="bg-white p-6 rounded w-96">

        <h3 className="font-semibold mb-4">

          Send Message

        </h3>

        <input
          placeholder="Sender"
          className="border p-2 w-full mb-2"
          onChange={(e) =>
            setForm({
              ...form,
              sender: e.target.value,
            })
          }
        />

        <input
          placeholder="Receiver"
          className="border p-2 w-full mb-2"
          onChange={(e) =>
            setForm({
              ...form,
              receiver: e.target.value,
            })
          }
        />

        <textarea
          placeholder="Message"
          className="border p-2 w-full mb-4"
          onChange={(e) =>
            setForm({
              ...form,
              message: e.target.value,
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
            onClick={handleSend}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Send
          </button>

        </div>

      </div>

    </div>

  );

}