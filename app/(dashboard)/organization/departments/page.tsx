"use client";

import { useState } from "react";

export default function DepartmentPage() {

  // MOCK DATA (same as previous pages)
  const organizations = [
    { id: 1, name: "Foodies Hub" },
    { id: 2, name: "Spice Garden" }
  ];

  const divisions = [
    { id: 1, name: "Kochi Branch", organizationId: 1 },
    { id: 2, name: "Bangalore Branch", organizationId: 1 },
    { id: 3, name: "Chennai Branch", organizationId: 2 }
  ];

  const [selectedOrg, setSelectedOrg] = useState<number | null>(null);
  const [selectedDiv, setSelectedDiv] = useState<number | null>(null);
  const [deptName, setDeptName] = useState("");
  const [departments, setDepartments] = useState<any[]>([]);

  // Filter divisions based on selected organization
  const filteredDivisions = divisions.filter(
    (d) => d.organizationId === selectedOrg
  );

  // Filter departments based on selected division
  const filteredDepartments = departments.filter(
    (d) => d.divisionId === selectedDiv
  );

  const addDepartment = () => {

    if (!deptName.trim() || !selectedDiv) return;

    const newDept = {
      id: Date.now(),
      name: deptName,
      divisionId: selectedDiv
    };

    setDepartments([...departments, newDept]);
    setDeptName("");
  };

  return (

    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Department Management
      </h1>

      {/* SELECT ORGANIZATION */}

      <div className="bg-white p-6 rounded-lg shadow mb-6">

        <label className="text-sm text-gray-700">
          Select Organization <span className="text-red-500">*</span>
        </label>

        <select
          value={selectedOrg || ""}
          onChange={(e) => {
            setSelectedOrg(Number(e.target.value));
            setSelectedDiv(null); // reset division when org changes
          }}
          className="w-full mt-2 border border-gray-200 p-2 rounded"
        >
          <option value="">-- Select Organization --</option>

          {organizations.map((org) => (
            <option key={org.id} value={org.id}>
              {org.name}
            </option>
          ))}

        </select>

      </div>

      {/* SELECT DIVISION */}

      <div className="bg-white p-6 rounded-lg shadow mb-6">

        <label className="text-sm text-gray-700">
          Select Division <span className="text-red-500">*</span>
        </label>

        <select
          value={selectedDiv || ""}
          onChange={(e) => setSelectedDiv(Number(e.target.value))}
          className="w-full mt-2 border border-gray-200 p-2 rounded"
          disabled={!selectedOrg}
        >
          <option value="">-- Select Division --</option>

          {filteredDivisions.map((div) => (
            <option key={div.id} value={div.id}>
              {div.name}
            </option>
          ))}

        </select>

      </div>

      {/* ADD DEPARTMENT */}

      <div className="bg-white p-6 rounded-lg shadow mb-6">

        <h2 className="text-lg font-semibold mb-4">
          Add Department
        </h2>

        <div className="flex gap-3">

          <input
            value={deptName}
            onChange={(e) => setDeptName(e.target.value)}
            placeholder="Enter department name"
            className="flex-1 border border-gray-200 p-2 rounded"
          />

          <button
            onClick={addDepartment}
            className="bg-gray-800 text-white px-4 rounded"
          >
            Add
          </button>

        </div>

      </div>

      {/* LIST */}

      <div className="bg-white p-6 rounded-lg shadow">

        <h2 className="text-lg font-semibold mb-4">
          Departments
        </h2>

        {!selectedOrg ? (
          <p className="text-gray-500">
            Select an organization first
          </p>
        ) : !selectedDiv ? (
          <p className="text-gray-500">
            Select a division
          </p>
        ) : filteredDepartments.length === 0 ? (
          <p className="text-gray-500">
            No departments added
          </p>
        ) : (

          <ul className="space-y-2">

            {filteredDepartments.map((dept) => (
              <li
                key={dept.id}
                className="p-3 border border-gray-200 rounded"
              >
                {dept.name}
              </li>
            ))}

          </ul>

        )}

      </div>

    </div>
  );
}