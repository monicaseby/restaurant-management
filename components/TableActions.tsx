"use client";

import {
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";

type Props = {
  id: number;
  openMenu: number | null;
  setOpenMenu: (id: number | null) => void;
  onEdit: () => void;
  onDelete: () => void;
};

export default function TableActions({
  id,
  openMenu,
  setOpenMenu,
  onEdit,
  onDelete,
}: Props) {

  return (

    <div className="relative text-right">

      <button
        onClick={() =>
          setOpenMenu(
            openMenu === id ? null : id
          )
        }
      >
        <MoreVertical size={16} />
      </button>

      {openMenu === id && (

        <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow">

          <button
            onClick={onEdit}
            className="flex gap-2 px-3 py-2 hover:bg-gray-100 w-full text-left"
          >
            <Pencil size={14} />
            Edit
          </button>

          <button
            onClick={onDelete}
            className="flex gap-2 px-3 py-2 hover:bg-gray-100 text-red-500 w-full text-left"
          >
            <Trash2 size={14} />
            Delete
          </button>

        </div>

      )}

    </div>

  );

}