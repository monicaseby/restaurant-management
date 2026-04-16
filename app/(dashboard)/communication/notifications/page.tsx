"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import TableActions from "../../../../components/TableActions";
import NotificationModal from "../../../../components/NotificationModal";

type Notification = {
  id: number;
  message: string;
  type: string;
  date: string;
  status: string;
};

const initialData: Notification[] = [

  {
    id: 1,
    message: "New order received",
    type: "Order",
    date: "21 Mar 2025",
    status: "Unread",
  },

  {
    id: 2,
    message: "Table reservation confirmed",
    type: "Reservation",
    date: "20 Mar 2025",
    status: "Read",
  },

  {
    id: 3,
    message: "Payment successful",
    type: "Payment",
    date: "19 Mar 2025",
    status: "Unread",
  },

];

export default function NotificationsPage() {

  const [data, setData] =
    useState(initialData);

  const [search, setSearch] =
    useState("");

  const [openMenu, setOpenMenu] =
    useState<number | null>(null);

  const [modalOpen, setModalOpen] =
    useState(false);

  const [editItem, setEditItem] =
    useState<any>(null);

  // FILTER

  const filtered = data.filter((d) =>
    d.message
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // DELETE

  const deleteItem = (id: number) => {

    setData(
      data.filter((d) => d.id !== id)
    );

  };

  return (

    <div className="p-6 bg-gray-100 min-h-screen">

      {/* HEADER */}

      <div className="flex justify-between mb-4">

        <h2 className="text-lg font-semibold">

          Notifications

        </h2>

        <button
          onClick={() => {
            setEditItem(null);
            setModalOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded flex gap-2"
        >

          <Plus size={14} />

          Add Notification

        </button>

      </div>

      {/* SEARCH */}

      <input
        placeholder="Search..."
        className="border p-2 rounded mb-3 w-64"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      {/* TABLE */}

      <div className="bg-white rounded border">

        <table className="w-full text-sm">

          <thead className="bg-gray-50">

            <tr>

              <th className="p-3 text-left">
                Message
              </th>

              <th className="p-3 text-left">
                Type
              </th>

              <th className="p-3 text-left">
                Date
              </th>

              <th className="p-3 text-left">
                Status
              </th>

              <th className="p-3"></th>

            </tr>

          </thead>

          <tbody>

            {filtered.map((item) => (

              <tr
                key={item.id}
                className="border-t hover:bg-gray-50"
              >

                <td className="p-3 font-medium">

                  {item.message}

                </td>

                <td className="p-3">
                  {item.type}
                </td>

                <td className="p-3">
                  {item.date}
                </td>

                <td className="p-3">
                  {item.status}
                </td>

                <td className="p-3">

                  <TableActions
                    id={item.id}
                    openMenu={openMenu}
                    setOpenMenu={setOpenMenu}
                    onEdit={() => {
                      setEditItem(item);
                      setModalOpen(true);
                    }}
                    onDelete={() =>
                      deleteItem(item.id)
                    }
                  />

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <NotificationModal
        open={modalOpen}
        setOpen={setModalOpen}
        editItem={editItem}
        setData={setData}
        data={data}
      />

    </div>

  );

}