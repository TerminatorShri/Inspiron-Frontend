import { useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileDiff, PlusCircle, MinusCircle, ArrowRight } from "lucide-react";

export default function Versioning() {
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
      files: ["metadata/snapshot-001.json"],
    },
    {
      id: "v2",
      label: "Version 2 (2025-03-12)",
      schema: [
        { name: "sale_id", type: "INT" },
        { name: "customer", type: "STRING" },
        { name: "amount", type: "DOUBLE" },
        { name: "sale_date", type: "DATE" },
        { name: "discount", type: "FLOAT" },
      ],
      files: ["metadata/snapshot-001.json", "metadata/snapshot-002.json"],
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
      files: [
        "metadata/snapshot-001.json",
        "metadata/snapshot-002.json",
        "metadata/snapshot-003.json",
      ],
    },
  ];

  const [selectedVersion1, setSelectedVersion1] = useState("v1");
  const [selectedVersion2, setSelectedVersion2] = useState("v2");

  // Get selected version details
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

    return {
      name: field,
      typeV1: fieldV1 ? fieldV1.type : "Absent",
      typeV2: fieldV2 ? fieldV2.type : "Absent",
    };
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <FileDiff className="w-8 h-8 text-blue-500" /> Versioning & Snapshots:
        Sales
      </h2>

      {/* Dropdowns to Select Versions */}
      <div className="flex gap-4 mb-6">
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">
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
          <label className="font-semibold text-gray-700">
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

      {/* Schema Comparison Table */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h3 className="text-xl font-semibold mb-3">Schema Changes</h3>
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-200">
              <TableHead>Field Name</TableHead>
              <TableHead>{version1.label}</TableHead> {/* Dynamic header */}
              <TableHead>{version2.label}</TableHead> {/* Dynamic header */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {changes.map((change) => (
              <TableRow key={change.name} className="border-b">
                <TableCell className="font-semibold">{change.name}</TableCell>
                <TableCell
                  className={
                    change.typeV1 !== change.typeV2
                      ? "bg-yellow-100 text-yellow-700"
                      : ""
                  }
                >
                  {change.typeV1 === "Absent" ? (
                    <span className="flex items-center gap-2">
                      <MinusCircle className="w-4 h-4 text-gray-500" /> Absent
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      {change.typeV1 !== change.typeV2 ? (
                        <ArrowRight className="w-4 h-4 text-yellow-500" />
                      ) : null}
                      {change.typeV1}
                    </span>
                  )}
                </TableCell>
                <TableCell
                  className={
                    change.typeV1 !== change.typeV2
                      ? "bg-yellow-100 text-yellow-700"
                      : ""
                  }
                >
                  {change.typeV2 === "Absent" ? (
                    <span className="flex items-center gap-2">
                      <PlusCircle className="w-4 h-4 text-gray-500" /> Absent
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      {change.typeV1 !== change.typeV2 ? (
                        <ArrowRight className="w-4 h-4 text-yellow-500" />
                      ) : null}
                      {change.typeV2}
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Snapshot File Comparison */}
      <div className="bg-white shadow-md rounded-lg p-4 mt-6">
        <h3 className="text-xl font-semibold mb-3">Snapshot Files</h3>
        <p>
          <strong>Version 1 Files:</strong> {version1.files.join(", ")}
        </p>
        <p>
          <strong>Version 2 Files:</strong> {version2.files.join(", ")}
        </p>
      </div>
    </div>
  );
}
