"use client";

import { useState } from "react";
import {
  MoreVertical,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";

type Department = {
  id: number;
  name: string;
  division: string;
  createdAt: string;
  staff: number;
  status: "Active" | "Inactive";
};

// ---------------- STRUCTURED DATA ----------------
const initialData: Department[] = [
  // 🔵 Top Management
  { id: 1, name: "Owner", division: "Top Management", createdAt: "1 Mar 2025", staff: 1, status: "Active" },
  { id: 2, name: "General Manager", division: "Top Management", createdAt: "2 Mar 2025", staff: 2, status: "Active" },
  { id: 3, name: "Assistant Manager", division: "Top Management", createdAt: "3 Mar 2025", staff: 3, status: "Active" },

  // 🟢 FOH
  { id: 4, name: "Servers", division: "FOH", createdAt: "4 Mar 2025", staff: 15, status: "Active" },
  { id: 5, name: "Bartenders", division: "FOH", createdAt: "5 Mar 2025", staff: 5, status: "Active" },
  { id: 6, name: "Hosts", division: "FOH", createdAt: "6 Mar 2025", staff: 6, status: "Active" },
  { id: 7, name: "Bussers", division: "FOH", createdAt: "7 Mar 2025", staff: 4, status: "Inactive" },

  // 🔴 BOH
  { id: 8, name: "Executive Chef", division: "BOH", createdAt: "8 Mar 2025", staff: 2, status: "Active" },
  { id: 9, name: "Line Cooks", division: "BOH", createdAt: "9 Mar 2025", staff: 10, status: "Active" },
  { id: 10, name: "Prep Cooks", division: "BOH", createdAt: "10 Mar 2025", staff: 6, status: "Active" },
  { id: 11, name: "Dishwashers", division: "BOH", createdAt: "11 Mar 2025", staff: 5, status: "Inactive" },

  // 🟡 Logistics
  { id: 12, name: "Drivers", division: "Logistics", createdAt: "12 Mar 2025", staff: 8, status: "Active" },
  { id: 13, name: "Dispatchers", division: "Logistics", createdAt: "13 Mar 2025", staff: 3, status: "Active" },

  // 🟣 Sales & Marketing
  { id: 14, name: "Marketing Manager", division: "Sales & Marketing", createdAt: "14 Mar 2025", staff: 2, status: "Active" },
  { id: 15, name: "Sales Executive", division: "Sales & Marketing", createdAt: "15 Mar 2025", staff: 4, status: "Active" },
  { id: 16, name: "CRM Executive", division: "Sales & Marketing", createdAt: "16 Mar 2025", staff: 2, status: "Inactive" },
];

export default function DepartmentPage() {
  const [data, setData] = useState(initialData);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("recent");
  const [statusFilter, setStatusFilter] = useState("all");
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  // ---------------- FILTER ----------------
  let filtered = data.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  if (statusFilter !== "all") {
    filtered = filtered.filter((d) => d.status === statusFilter);
  }

  // ---------------- SORT ----------------
  if (sort === "staff") {
    filtered.sort((a, b) => b.staff - a.staff);
  }

  // ---------------- DELETE ----------------
  const handleDelete = (id: number) => {
    if (!confirm("Delete this department?")) return;
    setData(data.filter((d) => d.id !== id));
  };

  return (
    <div className="py-3 px-1  bg-gray-100 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <div><h1 className="text-3xl font-bold">Organization</h1></div>
        <h2 className="text-lg font-semibold">
          Departments
          <span className="ml-2 text-sm bg-indigo-100 text-indigo-600 px-2 py-1 rounded">
            Total: {filtered.length}
          </span>
        </h2>

        <button className="bg-indigo-600 text-white px-4 py-2 rounded flex items-center gap-2">
          <Plus size={14} /> Add New
        </button>
      </div>

      {/* FILTER BAR */}
      <div className="flex justify-between items-center mb-3">

        <input
          placeholder="Search department..."
          className="border p-2 rounded w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex gap-2">
          <select
            className="border px-3 py-2 rounded text-sm"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <select
            className="border px-3 py-2 rounded text-sm"
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="recent">Sort By: Recent</option>
            <option value="staff">Sort By: Staff</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-3 text-left">Department</th>
              <th className="p-3 text-left">Division</th>
              <th className="p-3 text-left">Created Date</th>
              <th className="p-3 text-left">No of Staff</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3"></th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} className="border-t hover:bg-gray-50">

                <td className="p-3 font-medium">{item.name}</td>
                <td className="p-3 text-gray-600">{item.division}</td>
                <td className="p-3 text-gray-500">{item.createdAt}</td>
                <td className="p-3">{item.staff}</td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      item.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-500"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="p-3 text-right relative">
                  <button
                    onClick={() =>
                      setOpenMenu(openMenu === item.id ? null : item.id)
                    }
                  >
                    <MoreVertical size={16} />
                  </button>

                  {openMenu === item.id && (
                    <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow">
                      <button className="flex gap-2 px-3 py-2 hover:bg-gray-100 w-full text-left">
                        <Pencil size={14} /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="flex gap-2 px-3 py-2 hover:bg-gray-100 text-red-500 w-full text-left"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  )}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}