"use client";

import { useState } from "react";

export default function DivisionPage() {

  // MOCK ORGANIZATIONS (later replace with API)
  const organizations = [
    { id: 1, name: "Foodies Hub" },
    { id: 2, name: "Spice Garden" }
  ];

  const [selectedOrg, setSelectedOrg] = useState<number | null>(null);
  const [divisionName, setDivisionName] = useState("");
  const [divisions, setDivisions] = useState<any[]>([]);

  const addDivision = () => {

    if (!divisionName.trim() || !selectedOrg) return;

    const newDivision = {
      id: Date.now(),
      name: divisionName,
      organizationId: selectedOrg
    };

    setDivisions([...divisions, newDivision]);
    setDivisionName("");
  };

  const filteredDivisions = divisions.filter(
    (d) => d.organizationId === selectedOrg
  );

  return (

    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Division Management
      </h1>

      {/* SELECT ORGANIZATION */}

      <div className="bg-white p-6 rounded-lg shadow mb-6">

        <label className="text-gray-700 text-sm">
          Select Organization <span className="text-red-500">*</span>
        </label>

        <select
          value={selectedOrg || ""}
          onChange={(e) => setSelectedOrg(Number(e.target.value))}
          className="w-full mt-2 border border-gray-200 p-2 rounded"
        >
          <option value="">-- Select --</option>
          {organizations.map((org) => (
            <option key={org.id} value={org.id}>
              {org.name}
            </option>
          ))}
        </select>

      </div>

      {/* ADD DIVISION */}

      <div className="bg-white p-6 rounded-lg shadow mb-6">

        <h2 className="text-lg font-semibold mb-4">
          Add Division
        </h2>

        <div className="flex gap-3">

          <input
            value={divisionName}
            onChange={(e) => setDivisionName(e.target.value)}
            placeholder="Enter division name"
            className="flex-1 border border-gray-200 p-2 rounded"
          />

          <button
            onClick={addDivision}
            className="bg-gray-800 text-white px-4 rounded"
          >
            Add
          </button>

        </div>

      </div>

      {/* LIST */}

      <div className="bg-white p-6 rounded-lg shadow">

        <h2 className="text-lg font-semibold mb-4">
          Divisions
        </h2>

        {!selectedOrg ? (
          <p className="text-gray-500">
            Please select an organization
          </p>
        ) : filteredDivisions.length === 0 ? (
          <p className="text-gray-500">
            No divisions added
          </p>
        ) : (

          <ul className="space-y-2">

            {filteredDivisions.map((div) => (
              <li
                key={div.id}
                className="p-3 border border-gray-200 rounded"
              >
                {div.name}
              </li>
            ))}

          </ul>

        )}

      </div>

    </div>
  );
}