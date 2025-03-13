import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, BarChart, File, HardDriveDownload } from "lucide-react";

export default function KeyMetrics() {
  // Dummy metrics data
  const metrics = {
    totalFiles: 5,
    totalFileSize: "1.8 GB",
    totalRows: 3_500_000,
    avgFileSize: "360 MB",
    optimizationSavings: "250 MB",
    optimizedFiles: 3,
  };

  // File details
  const fileStats = [
    { name: "0001.parquet", size: "500 MB", rows: 1_000_000 },
    { name: "0002.parquet", size: "450 MB", rows: 900_000 },
    { name: "0003.parquet", size: "350 MB", rows: 750_000 },
    { name: "0004.parquet", size: "300 MB", rows: 500_000 },
    { name: "0005.parquet", size: "200 MB", rows: 350_000 },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <BarChart className="w-8 h-8 text-blue-500" /> Key Metrics: Sales
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Rows */}
        <Card className="shadow-lg border">
          <CardHeader className="bg-blue-100 rounded-t-lg p-3">
            <CardTitle className="text-blue-700 flex items-center gap-2">
              <Database className="w-5 h-5" /> Total Rows
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-gray-700 text-lg font-semibold">
              {metrics.totalRows.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        {/* Total File Size */}
        <Card className="shadow-lg border">
          <CardHeader className="bg-green-100 rounded-t-lg p-3">
            <CardTitle className="text-green-700 flex items-center gap-2">
              <HardDriveDownload className="w-5 h-5" /> Total File Size
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-gray-700 text-lg font-semibold">
              {metrics.totalFileSize}
            </p>
          </CardContent>
        </Card>

        {/* Optimization Savings */}
        <Card className="shadow-lg border">
          <CardHeader className="bg-yellow-100 rounded-t-lg p-3">
            <CardTitle className="text-yellow-700 flex items-center gap-2">
              <File className="w-5 h-5" /> Optimization Savings
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-gray-700 text-lg font-semibold">
              {metrics.optimizationSavings}
            </p>
            <p className="text-gray-500 text-sm">
              ({metrics.optimizedFiles} files optimized)
            </p>
          </CardContent>
        </Card>
      </div>

      {/* File Statistics */}
      <div className="bg-white shadow-md rounded-lg p-4 mt-6">
        <h3 className="text-xl font-semibold mb-3">File Details</h3>
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-200">
              <TableHead>File Name</TableHead>
              <TableHead>File Size</TableHead>
              <TableHead>Row Count</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fileStats.map((file) => (
              <TableRow key={file.name} className="border-b">
                <TableCell className="flex items-center gap-2">
                  <File className="w-4 h-4 text-blue-500" /> {file.name}
                </TableCell>
                <TableCell>{file.size}</TableCell>
                <TableCell>{file.rows.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
