import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { FileText, Database, FolderOpen } from "lucide-react";
import PartitionDetails from "./PartitionDetails";

export default function TableProperties() {
  // Dummy table properties for Sales Table
  const properties = [
    { name: "Table Format", value: "Iceberg" },
    { name: "Storage Location", value: "s3://company-data/sales/" },
  ];

  const manifestFiles = [
    "metadata/manifest-0001.avro",
    "metadata/manifest-0002.avro",
  ];
  const transactionLogs = [
    "delta_log/00000001.json",
    "delta_log/00000002.json",
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Database className="w-8 h-8 text-blue-500" /> Table Properties: Sales
      </h2>

      {/* Cards for Key Properties */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {properties.map((prop) => (
          <Card key={prop.name} className="shadow-lg border">
            <CardHeader className="bg-blue-100 rounded-t-lg p-3">
              <CardTitle className="text-blue-700">{prop.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-gray-700">{prop.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Expandable Sections for Manifest Files & Transaction Logs */}
      <div className="mt-6">
        <Accordion type="multiple">
          {/* Manifest Files */}
          <AccordionItem value="manifest">
            <AccordionTrigger className="text-lg font-semibold flex items-center gap-2">
              <FolderOpen className="w-5 h-5 text-blue-600" />
              Manifest Files
            </AccordionTrigger>
            <AccordionContent className="p-3 bg-gray-50 rounded">
              {manifestFiles.map((file, index) => (
                <p
                  key={index}
                  className="flex items-center gap-2 text-gray-700"
                >
                  <FileText className="w-4 h-4 text-blue-500" /> {file}
                </p>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Increased gap between the last accordion and PartitionDetails */}
        <div className="mt-20">
          <PartitionDetails />
        </div>
      </div>
    </div>
  );
}
