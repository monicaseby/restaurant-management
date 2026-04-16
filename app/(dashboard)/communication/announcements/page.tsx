"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import TableActions from "../../../../components/TableActions";
import AnnouncementModal from "../../../../components/AnnouncementModal";

export default function AnnouncementsPage() {

  const [data, setData] = useState([
    {
      id: 1,
      title: "Holiday Notice",
      audience: "All Staff",
      date: "25 Mar 2025",
    },

    {
      id: 2,
      title: "New Menu Launch",
      audience: "Kitchen",
      date: "20 Mar 2025",
    },
  ]);

  const [openMenu, setOpenMenu] =
    useState<number | null>(null);

  const [modalOpen, setModalOpen] =
    useState(false);

  const [editItem, setEditItem] =
    useState<any>(null);

  const deleteItem = (id: number) => {

    setData(
      data.filter((d) => d.id !== id)
    );

  };

  return (

    <div className="p-6 bg-gray-100 min-h-screen">

      <div className="flex justify-between mb-4">

        <h2 className="text-lg font-semibold">

          Announcements

        </h2>

        <button
          onClick={() => {
            setEditItem(null);
            setModalOpen(true);
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded flex gap-2"
        >

          <Plus size={14} />

          Add Announcement

        </button>

      </div>

      <div className="bg-white rounded border">

        <table className="w-full text-sm">

          <thead className="bg-gray-50">

            <tr>

              <th className="p-3 text-left">
                Title
              </th>

              <th className="p-3 text-left">
                Audience
              </th>

              <th className="p-3 text-left">
                Date
              </th>

              <th></th>

            </tr>

          </thead>

          <tbody>

            {data.map((item) => (

              <tr key={item.id} className="border-t">

                <td className="p-3">
                  {item.title}
                </td>

                <td className="p-3">
                  {item.audience}
                </td>

                <td className="p-3">
                  {item.date}
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

      <AnnouncementModal
        open={modalOpen}
        setOpen={setModalOpen}
        editItem={editItem}
        setData={setData}
        data={data}
      />

    </div>

  );

}