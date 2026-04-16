"use client";

import { Bell, AlertTriangle, Megaphone } from "lucide-react";

export default function CommunicationDashboard() {

  // ---------------- SUMMARY DATA ----------------

  const summary = {
    alerts: 8,
    notifications: 24,
    announcements: 5,
    unread: 6,
  };

  // ---------------- RECENT ALERTS ----------------

  const recentAlerts = [
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
  ];

  // ---------------- RECENT NOTIFICATIONS ----------------

  const recentNotifications = [
    {
      id: 1,
      message: "New Order #104 received",
      time: "10:30 AM",
    },
    {
      id: 2,
      message: "Reservation confirmed for Table 6",
      time: "10:10 AM",
    },
    {
      id: 3,
      message: "Delivery assigned to Driver",
      time: "9:50 AM",
    },
    {
      id: 4,
      message: "Payment received from Table 3",
      time: "9:20 AM",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* PAGE TITLE */}

      <h1 className="text-2xl font-semibold mb-6">
        Communication Dashboard
      </h1>

      {/* SUMMARY CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

        {/* Alerts */}

        <div className="bg-white p-4 rounded-lg border flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">
              Total Alerts
            </p>
            <h2 className="text-2xl font-semibold text-red-600">
              {summary.alerts}
            </h2>
          </div>

          <AlertTriangle className="text-red-500" size={28} />
        </div>

        {/* Notifications */}

        <div className="bg-white p-4 rounded-lg border flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">
              Notifications
            </p>
            <h2 className="text-2xl font-semibold text-blue-600">
              {summary.notifications}
            </h2>
          </div>

          <Bell className="text-blue-500" size={28} />
        </div>

        {/* Announcements */}

        <div className="bg-white p-4 rounded-lg border flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">
              Announcements
            </p>
            <h2 className="text-2xl font-semibold text-indigo-600">
              {summary.announcements}
            </h2>
          </div>

          <Megaphone className="text-indigo-500" size={28} />
        </div>

        {/* Unread */}

        <div className="bg-white p-4 rounded-lg border flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">
              Unread Messages
            </p>
            <h2 className="text-2xl font-semibold text-green-600">
              {summary.unread}
            </h2>
          </div>

          <Bell className="text-green-500" size={28} />
        </div>

      </div>

      {/* MAIN GRID */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* RECENT ALERTS TABLE */}

        <div className="bg-white rounded-lg border p-4">

          <h2 className="text-lg font-semibold mb-4">
            Recent Alerts
          </h2>

          <table className="w-full text-sm">

            <thead className="text-gray-500 border-b">
              <tr>
                <th className="text-left pb-2">Alert</th>
                <th className="text-left pb-2">Priority</th>
                <th className="text-left pb-2">Status</th>
              </tr>
            </thead>

            <tbody>

              {recentAlerts.map((alert) => (

                <tr key={alert.id} className="border-b last:border-none">

                  <td className="py-3">
                    <p className="font-medium">
                      {alert.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {alert.category} • {alert.date}
                    </p>
                  </td>

                  {/* Priority */}

                  <td>

                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        alert.priority === "High"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {alert.priority}
                    </span>

                  </td>

                  {/* Status */}

                  <td>

                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        alert.status === "Active"
                          ? "bg-green-100 text-green-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {alert.status}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* RECENT NOTIFICATIONS */}

        <div className="bg-white rounded-lg border p-4">

          <h2 className="text-lg font-semibold mb-4">
            Recent Notifications
          </h2>

          <div className="space-y-3">

            {recentNotifications.map((note) => (

              <div
                key={note.id}
                className="flex justify-between items-center border-b pb-2 last:border-none"
              >

                <p className="text-sm">
                  {note.message}
                </p>

                <span className="text-xs text-gray-500">
                  {note.time}
                </span>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}