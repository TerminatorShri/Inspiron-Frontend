import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Filter, BarChart, Layers } from "lucide-react";

export default function PartitionDetails() {
  // Dummy partition column details
  const partitionColumns = [
    {
      name: "sale_date",
      type: "DATE",
      distinctValues: 30,
      min: "2025-03-01",
      max: "2025-03-30",
    },
    {
      name: "region",
      type: "STRING",
      distinctValues: 5,
      min: "North",
      max: "West",
    },
    {
      name: "category",
      type: "STRING",
      distinctValues: 10,
      min: "Electronics",
      max: "Toys",
    },
    {
      name: "customer_segment",
      type: "STRING",
      distinctValues: 3,
      min: "Retail",
      max: "Wholesale",
    },
  ];

  // Dummy pruning statistics
  const pruningStats = {
    totalPartitions: 200,
    scannedPartitions: 15,
    pruningEfficiency: "92.5%", // (100 - scannedPartitions / totalPartitions * 100)
    queriesOptimized: 180,
    avgPartitionsScannedPerQuery: 8,
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Filter className="w-8 h-8 text-blue-500" /> Partition Details: Sales
      </h2>

      {/* Partition Columns Table */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-500" /> Partition Columns
        </h3>
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-200">
              <TableHead>Partition Column</TableHead>
              <TableHead>Data Type</TableHead>
              <TableHead>Distinct Values</TableHead>
              <TableHead>Min Value</TableHead>
              <TableHead>Max Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {partitionColumns.map((col) => (
              <TableRow key={col.name} className="border-b">
                <TableCell>{col.name}</TableCell>
                <TableCell>{col.type}</TableCell>
                <TableCell>{col.distinctValues}</TableCell>
                <TableCell>{col.min}</TableCell>
                <TableCell>{col.max}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pruning Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <Card className="shadow-lg border">
          <CardHeader className="bg-blue-100 rounded-t-lg p-3">
            <CardTitle className="text-blue-700 flex items-center gap-2">
              <BarChart className="w-5 h-5" /> Pruning Statistics
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-gray-700">
              <strong>Total Partitions:</strong> {pruningStats.totalPartitions}
            </p>
            <p className="text-gray-700">
              <strong>Scanned Partitions:</strong>{" "}
              {pruningStats.scannedPartitions}
            </p>
            <p className="text-gray-700">
              <strong>Pruning Efficiency:</strong>{" "}
              {pruningStats.pruningEfficiency}
            </p>
            <p className="text-gray-700">
              <strong>Queries Optimized:</strong>{" "}
              {pruningStats.queriesOptimized}
            </p>
            <p className="text-gray-700">
              <strong>Avg Partitions Scanned per Query:</strong>{" "}
              {pruningStats.avgPartitionsScannedPerQuery}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
