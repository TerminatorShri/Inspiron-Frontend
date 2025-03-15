import { useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Columns, Table as TableIcon } from "lucide-react";

export default function PartitionDetails() {
  const partitions = [
    { partition_id: 1, partition_key: "2025-03-10", row_count: 5000, size_mb: 120.5 },
    { partition_id: 2, partition_key: "2025-03-11", row_count: 4200, size_mb: 98.3 },
    { partition_id: 3, partition_key: "2025-03-12", row_count: 3800, size_mb: 89.7 },
  ];

  const pruningStats = {
    total_pruned: 6500,
    total_scanned: 2500,
    pruning_efficiency: "72%",
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 text-gray-800">
        <TableIcon className="w-8 h-8 text-blue-600" /> Partition Details 
      </h2>

      {/* Partition Details Table */}
      <div className="bg-white shadow-lg rounded-lg p-4 border border-gray-300">
        <Table className="border-collapse w-full">
          <TableHeader>
            <TableRow className="bg-gray-100 border-b-2 border-gray-300">
              <TableHead className="font-mono text-sm px-4 py-2 border-r">Partition ID</TableHead>
              <TableHead className="font-mono text-sm px-4 py-2 border-r">Partition Key</TableHead>
              <TableHead className="font-mono text-sm px-4 py-2 border-r">Row Count</TableHead>
              <TableHead className="font-mono text-sm px-4 py-2">Size (MB)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {partitions.map((partition) => (
              <TableRow key={partition.partition_id} className="border-b border-gray-300">
                <TableCell className="font-mono text-sm px-4 py-2 border-r text-blue-700">
                  {partition.partition_id}
                </TableCell>
                <TableCell className="font-mono text-sm px-4 py-2 border-r">
                  {partition.partition_key}
                </TableCell>
                <TableCell className="font-mono text-sm px-4 py-2 border-r">
                  {partition.row_count.toLocaleString()}
                </TableCell>
                <TableCell className="font-mono text-sm px-4 py-2">
                  {partition.size_mb.toFixed(1)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pruning Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        
      </div>
    </div>
  );
}
