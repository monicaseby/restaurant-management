"use client";

import { useState } from "react";
import MessageModal from "../../../../components/MessageModal";

export default function MessagesPage() {

  const [messages, setMessages] =
    useState([
      {
        id: 1,
        sender: "Manager",
        receiver: "Chef",
        message: "Check inventory levels",
      },

      {
        id: 2,
        sender: "Reception",
        receiver: "Manager",
        message: "VIP reservation confirmed",
      },
    ]);

  const [modalOpen, setModalOpen] =
    useState(false);

  return (

    <div className="p-6 bg-gray-100 min-h-screen">

      <h2 className="text-lg font-semibold mb-4">

        Internal Messages

      </h2>

      <button
        onClick={() => setModalOpen(true)}
        className="bg-green-600 text-white px-4 py-2 rounded mb-4"
      >

        Send Message

      </button>

      <div className="space-y-3">

        {messages.map((msg) => (

          <div
            key={msg.id}
            className="bg-white p-4 rounded border"
          >

            <p className="font-medium">

              {msg.sender} → {msg.receiver}

            </p>

            <p className="text-gray-600 text-sm">

              {msg.message}

            </p>

          </div>

        ))}

      </div>

      <MessageModal
        open={modalOpen}
        setOpen={setModalOpen}
        setData={setMessages}
        data={messages}
      />

    </div>

  );

}