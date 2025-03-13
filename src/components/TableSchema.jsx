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
import { Button } from "@/components/ui/button";
import { toast } from "sonner"; // ✅ Import Sonner toast
import {
  FileText,
  Key,
  Columns,
  Table as TableIcon,
  Database,
  Download,
} from "lucide-react";

export default function TableSchema() {
  const [isDownloading, setIsDownloading] = useState(false);

  // Latest schema from Version 3
  const schema = [
    {
      name: "sale_id",
      type: "INT",
      nullable: false,
      description: "Unique sale identifier",
    },
    {
      name: "customer",
      type: "TEXT",
      nullable: false,
      description: "Customer name (type updated)",
    },
    {
      name: "amount",
      type: "DOUBLE",
      nullable: false,
      description: "Total sale amount",
    },
    {
      name: "sale_date",
      type: "DATE",
      nullable: false,
      description: "Date of the sale",
    },
    {
      name: "discount",
      type: "FLOAT",
      nullable: true,
      description: "Discount applied (if any)",
    },
    {
      name: "tax",
      type: "DOUBLE",
      nullable: true,
      description: "Tax amount on the sale (new field)",
    },
  ];

  // Partition keys
  const partitionKeys = ["sale_date"];
  const primaryKey = ["sale_id"];

  // Sample Data
  const sampleData = [
    {
      sale_id: 1001,
      customer: "Alice",
      amount: 250.75,
      sale_date: "2025-03-10",
      discount: 10.0,
      tax: 5.0,
    },
    {
      sale_id: 1002,
      customer: "Bob",
      amount: 125.5,
      sale_date: "2025-03-10",
      discount: 5.0,
      tax: 2.5,
    },
    {
      sale_id: 1003,
      customer: "Charlie",
      amount: 89.99,
      sale_date: "2025-03-11",
      discount: 0.0,
      tax: 4.0,
    },
  ];

  // Handle Download Button Click
  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      toast.success("Excel file downloaded successfully!"); // ✅ Show toast notification
      setIsDownloading(false);
    }, 500);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <TableIcon className="w-8 h-8 text-blue-500" /> Table Schema: Sales
        (Latest)
      </h2>

      {/* Schema Table */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-200">
              <TableHead>Column Name</TableHead>
              <TableHead>Data Type</TableHead>
              <TableHead>Nullable</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {schema.map((col) => (
              <TableRow key={col.name} className="border-b">
                <TableCell className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-500" /> {col.name}
                </TableCell>
                <TableCell>{col.type}</TableCell>
                <TableCell>{col.nullable ? "YES" : "NO"}</TableCell>
                <TableCell>{col.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Partition & Primary Keys */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {/* Partition Keys */}
        <Card className="shadow-lg border">
          <CardHeader className="bg-blue-100 rounded-t-lg p-3">
            <CardTitle className="text-blue-700 flex items-center gap-2">
              <Columns className="w-5 h-5" /> Partition Keys
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-gray-700">
              {partitionKeys.length > 0 ? partitionKeys.join(", ") : "None"}
            </p>
          </CardContent>
        </Card>

        {/* Primary Key */}
        <Card className="shadow-lg border">
          <CardHeader className="bg-green-100 rounded-t-lg p-3">
            <CardTitle className="text-green-700 flex items-center gap-2">
              <Key className="w-5 h-5" /> Primary Key
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-gray-700">
              {primaryKey.length > 0 ? primaryKey.join(", ") : "None"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Sample Data with Download Button */}
      <div className="bg-white shadow-md rounded-lg p-4 mt-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Database className="w-6 h-6 text-blue-500" /> Sample Data (Latest)
          </h3>
          <Button
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            <Download className="w-4 h-4" />
            {isDownloading ? "Downloading..." : "Download Excel"}
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-200">
              {Object.keys(sampleData[0]).map((col) => (
                <TableHead key={col}>{col}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleData.map((row, index) => (
              <TableRow key={index} className="border-b">
                {Object.values(row).map((value, i) => (
                  <TableCell key={i}>{value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
