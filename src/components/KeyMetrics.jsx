import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, BarChart, File, HardDriveDownload, AlertTriangle } from "lucide-react";

export default function KeyMetrics() {
  const metrics = {
    totalFiles: 5,
    totalFileSize: "1.8 GB",
    totalRows: 3_500_000,
    avgFileSize: "360 MB",
    optimizationSavings: "250 MB",
    optimizedFiles: 3,
  };

  const fileStats = [
    { name: "0001.parquet", size: "500 MB", rows: 1_000_000 },
    { name: "0002.parquet", size: "450 MB", rows: 900_000 },
    { name: "0003.parquet", size: "350 MB", rows: 750_000 },
    { name: "0004.parquet", size: "300 MB", rows: 500_000 },
    { name: "0005.parquet", size: "80 MB", rows: 120_000 },
  ];

  const smallFiles = fileStats.filter(file => parseInt(file.size) < 100);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 text-gray-800">
        <BarChart className="w-8 h-8 text-blue-600" /> Key Metrics 
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-md border">
          <CardHeader className="bg-blue-100 rounded-t-lg p-3">
            <CardTitle className="text-blue-700 flex items-center gap-2">
              <Database className="w-5 h-5" /> Total Rows
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 font-mono text-xl">
            {metrics.totalRows.toLocaleString()}
          </CardContent>
        </Card>

        <Card className="shadow-md border">
          <CardHeader className="bg-green-100 rounded-t-lg p-3">
            <CardTitle className="text-green-700 flex items-center gap-2">
              <HardDriveDownload className="w-5 h-5" /> Total File Size
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 font-mono text-xl">
            {metrics.totalFileSize}
          </CardContent>
        </Card>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-4 border border-gray-300 mt-6">
        <h3 className="text-xl font-semibold mb-3">File Details</h3>
        <Table className="border-collapse w-full">
          <TableHeader>
            <TableRow className="bg-gray-100 border-b-2 border-gray-300">
              <TableHead className="font-mono text-sm px-4 py-2 border-r">File Name</TableHead>
              <TableHead className="font-mono text-sm px-4 py-2 border-r">File Size</TableHead>
              <TableHead className="font-mono text-sm px-4 py-2">Row Count</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fileStats.map((file) => (
              <TableRow key={file.name} className="border-b border-gray-300">
                <TableCell className="font-mono text-sm px-4 py-2 border-r flex items-center gap-2">
                  <File className="w-4 h-4 text-blue-500" /> {file.name}
                </TableCell>
                <TableCell className="font-mono text-sm px-4 py-2 border-r">{file.size}</TableCell>
                <TableCell className="font-mono text-sm px-4 py-2">{file.rows.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {smallFiles.length > 0 && (
        <div className="bg-red-50 shadow-lg rounded-lg p-4 border border-red-300 mt-6">
          <h3 className="text-xl font-semibold text-red-700 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" /> Small File Overhead
          </h3>
          <ul className="list-disc pl-6 text-red-600">
            {smallFiles.map(file => (
              <li key={file.name}>{file.name} - {file.size}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}