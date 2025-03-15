import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileDiff } from "lucide-react";

// Dummy versions data
const versions = [
  {
    id: "v1",
    label: "Version 1 (2025-03-10)",
    schema: [
      { name: "sale_id", type: "INT" },
      { name: "customer", type: "STRING" },
      { name: "amount", type: "DOUBLE" },
      { name: "sale_date", type: "DATE" },
    ],
  },
  {
    id: "v2",
    label: "Version 2 (2025-03-12)",
    schema: [
      { name: "sale_id", type: "INT" },
      { name: "customer", type: "STRING" },
      { name: "amount", type: "DOUBLE" },
      { name: "sale_date", type: "DATE" },
      { name: "discount", type: "FLOAT" }, // New field
    ],
  },
  {
    id: "v3",
    label: "Version 3 (2025-03-14)",
    schema: [
      { name: "sale_id", type: "INT" },
      { name: "customer", type: "TEXT" }, // Type changed
      { name: "amount", type: "DOUBLE" },
      { name: "sale_date", type: "DATE" },
      { name: "discount", type: "FLOAT" },
      { name: "tax", type: "DOUBLE" }, // Added field
    ],
  },
];

export default function Versioning() {
  const [selectedVersion1, setSelectedVersion1] = useState("v1");
  const [selectedVersion2, setSelectedVersion2] = useState("v2");

  const version1 = versions.find((v) => v.id === selectedVersion1);
  const version2 = versions.find((v) => v.id === selectedVersion2);

  // Compare schemas
  const allFields = [
    ...new Set([
      ...version1.schema.map((f) => f.name),
      ...version2.schema.map((f) => f.name),
    ]),
  ];

  const changes = allFields.map((field) => {
    const fieldV1 = version1.schema.find((f) => f.name === field);
    const fieldV2 = version2.schema.find((f) => f.name === field);

    if (!fieldV2) return { name: field, type: fieldV1.type, status: "removed" }; // 🔴 Removed
    if (!fieldV1) return { name: field, type: fieldV2.type, status: "added" }; // 🟢 Added
    if (fieldV1.type !== fieldV2.type)
      return {
        name: field,
        type: `${fieldV1.type} → ${fieldV2.type}`,
        status: "modified",
      }; // 🟠 Updated
    return { name: field, type: fieldV1.type, status: "unchanged" }; // No Change
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl mb-6 flex items-center gap-2">
        <FileDiff className="w-8 h-8 text-blue-500 kanit-extrabold" />{" "}
        Versioning & Snapshots: Sales
      </h2>

      {/* Dropdowns to Select Versions */}
      <div className="flex gap-4 mb-6 oxygen-light">
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-1">
            Compare Version 1
          </label>
          <Select value={selectedVersion1} onValueChange={setSelectedVersion1}>
            <SelectTrigger className="w-60 bg-white border border-gray-300 p-2 rounded">
              <SelectValue placeholder="Select Version 1" />
            </SelectTrigger>
            <SelectContent>
              {versions.map((v) => (
                <SelectItem key={v.id} value={v.id}>
                  {v.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-1">
            Compare Version 2
          </label>
          <Select value={selectedVersion2} onValueChange={setSelectedVersion2}>
            <SelectTrigger className="w-60 bg-white border border-gray-300 p-2 rounded">
              <SelectValue placeholder="Select Version 2" />
            </SelectTrigger>
            <SelectContent>
              {versions.map((v) => (
                <SelectItem key={v.id} value={v.id}>
                  {v.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Schema Comparison */}
      <div className="grid grid-cols-2 gap-4">
        {/* Version 1 Schema */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3 oxygen-bold">
            {version1.label} Schema
          </h3>
          <div className="border p-4 rounded-md bg-white text-black font-mono">
            {version1.schema.map((field) => (
              <div key={field.name} className="py-1">
                {field.name}: {field.type}
              </div>
            ))}
          </div>
        </div>

        {/* Version 2 Schema */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3 oxygen-bold">
            {version2.label} Schema
          </h3>
          <div className="border p-4 rounded-md bg-white text-black font-mono">
            {version2.schema.map((field) => (
              <div key={field.name} className="py-1">
                {field.name}: {field.type}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Changes Highlighting */}
      <div className="bg-white shadow-md rounded-lg p-4 mt-6">
        <h3 className="text-lg font-semibold mb-3 oxygen-bold">
          Schema Changes
        </h3>
        <div className="border p-4 rounded-md bg-white text-black font-mono">
          {changes.map((change) => (
            <div
              key={change.name}
              className={`py-1 px-2 rounded-md ${
                change.status === "removed"
                  ? "bg-red-200 text-red-900"
                  : change.status === "added"
                  ? "bg-green-200 text-green-900"
                  : change.status === "modified"
                  ? "bg-yellow-200 text-yellow-900"
                  : "bg-white"
              }`}
            >
              {change.status === "removed" && "- "}
              {change.status === "added" && "+ "}
              {change.status === "modified" && "~ "}
              {change.name}: {change.type}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
