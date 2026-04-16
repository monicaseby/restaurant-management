"use client";

import { useState } from "react";
import {
  MoreVertical,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";

type Alert = {
  id: number;
  title: string;
  category: string;
  priority: "High" | "Medium" | "Low";
  date: string;
  status: "Active" | "Resolved";
};

// ---------------- ALERT DATA ----------------

const initialAlerts: Alert[] = [

  {
    id: 1,
    title: "Low Stock - Tomatoes",
    category: "Inventory",
    priority: "High",
    date: "21 Mar 2025",
    status: "Active",
  },

  {
    id: 2,
    title: "Kitchen Delay - Order #205",
    category: "Orders",
    priority: "Medium",
    date: "20 Mar 2025",
    status: "Resolved",
  },

  {
    id: 3,
    title: "Staff Shortage - FOH",
    category: "Staff",
    priority: "High",
    date: "19 Mar 2025",
    status: "Active",
  },

  {
    id: 4,
    title: "Oven Maintenance Required",
    category: "Equipment",
    priority: "Low",
    date: "18 Mar 2025",
    status: "Active",
  },

  {
    id: 5,
    title: "Low Stock - Cheese",
    category: "Inventory",
    priority: "High",
    date: "17 Mar 2025",
    status: "Resolved",
  },

  {
    id: 6,
    title: "Reservation Conflict - Table 8",
    category: "Reservations",
    priority: "Medium",
    date: "16 Mar 2025",
    status: "Active",
  },

  {
    id: 7,
    title: "Payment Failure Detected",
    category: "Finance",
    priority: "High",
    date: "15 Mar 2025",
    status: "Resolved",
  },

  {
    id: 8,
    title: "Delivery Delay - Order #301",
    category: "Delivery",
    priority: "Medium",
    date: "14 Mar 2025",
    status: "Active",
  },

  {
    id: 9,
    title: "Freezer Temperature Warning",
    category: "Equipment",
    priority: "High",
    date: "13 Mar 2025",
    status: "Active",
  },

  {
    id: 10,
    title: "Low Staff Attendance",
    category: "Staff",
    priority: "Medium",
    date: "12 Mar 2025",
    status: "Resolved",
  },

];

export default function AlertsPage() {

  const [alerts, setAlerts] = useState(initialAlerts);

  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  // ---------------- FILTER ----------------

  let filtered = alerts.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  if (priorityFilter !== "all") {
    filtered = filtered.filter(
      (a) => a.priority === priorityFilter
    );
  }

  if (statusFilter !== "all") {
    filtered = filtered.filter(
      (a) => a.status === statusFilter
    );
  }

  // ---------------- DELETE ----------------

  const handleDelete = (id: number) => {

    if (!confirm("Delete this alert?")) return;

    setAlerts(alerts.filter((a) => a.id !== id));
  };

  return (

    <div className="py-3 px-1 bg-gray-100 min-h-screen">

      {/* HEADER */}

      <div className="flex justify-between items-center mb-4">

        <h2 className="text-3xl font-bold">

          Alerts

          <span className="ml-2 text-sm bg-red-100 text-red-600 px-2 py-1 rounded">
            Total: {filtered.length}
          </span>

        </h2>

        <button className="bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2">

          <Plus size={14} />

          Add Alert

        </button>

      </div>

      {/* FILTER BAR */}

      <div className="flex justify-between items-center mb-3">

        <input
          placeholder="Search alerts..."
          className="bg-white p-2 rounded w-64"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <div className="flex gap-2">

          {/* PRIORITY FILTER */}

          <select
            className=" px-3 py-2 rounded text-sm"
            onChange={(e) =>
              setPriorityFilter(e.target.value)
            }
          >

            <option value="all">
              All Priority
            </option>

            <option value="High">
              High
            </option>

            <option value="Medium">
              Medium
            </option>

            <option value="Low">
              Low
            </option>

          </select>

          {/* STATUS FILTER */}

          <select
            className=" px-3 py-2 rounded text-sm"
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >

            <option value="all">
              All Status
            </option>

            <option value="Active">
              Active
            </option>

            <option value="Resolved">
              Resolved
            </option>

          </select>

        </div>

      </div>

      {/* TABLE */}

      <div className="bg-white rounded-lg  overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-gray-50 text-gray-600">

            <tr>

              <th className="p-3 text-left">
                Alert
              </th>

              <th className="p-3 text-left">
                Category
              </th>

              <th className="p-3 text-left">
                Priority
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

            {filtered.map((alert) => (

              <tr
                key={alert.id}
                className=" hover:bg-gray-50"
              >

                <td className="p-3 font-medium">
                  {alert.title}
                </td>

                <td className="p-3 text-gray-600">
                  {alert.category}
                </td>

                {/* PRIORITY */}

                <td className="p-3">

                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      alert.priority === "High"
                        ? "bg-red-100 text-red-600"
                        : alert.priority === "Medium"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {alert.priority}
                  </span>

                </td>

                <td className="p-3 text-gray-500">
                  {alert.date}
                </td>

                {/* STATUS */}

                <td className="p-3">

                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      alert.status === "Active"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {alert.status}
                  </span>

                </td>

                {/* ACTIONS */}

                <td className="p-3 text-right relative">

                  <button
                    onClick={() =>
                      setOpenMenu(
                        openMenu === alert.id
                          ? null
                          : alert.id
                      )
                    }
                  >
                    <MoreVertical size={16} />
                  </button>

                  {openMenu === alert.id && (

                    <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow">

                      <button className="flex gap-2 px-3 py-2 hover:bg-gray-100 w-full text-left">

                        <Pencil size={14} />

                        Edit

                      </button>

                      <button
                        onClick={() =>
                          handleDelete(alert.id)
                        }
                        className="flex gap-2 px-3 py-2 hover:bg-gray-100 text-red-500 w-full text-left"
                      >

                        <Trash2 size={14} />

                        Delete

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