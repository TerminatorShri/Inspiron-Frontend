import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import ReactSelect from "react-select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import TrinoLogo from "@/assets/trino-logo.svg";

// Query Modes
const queryModes = [
  { id: "singleTable", title: "Single Table Query" },
  { id: "nested", title: "Nested Queries" },
  { id: "join", title: "Joins" },
  { id: "raw", title: "Raw SQL Editor" },
];

// Table schemas
const schemas = {
  sales: [
    { name: "sale_id", type: "INT" },
    { name: "customer", type: "TEXT" },
    { name: "amount", type: "DOUBLE" },
    { name: "sale_date", type: "DATE" },
  ],
  orders: [
    { name: "order_id", type: "INT" },
    { name: "customer_name", type: "TEXT" },
    { name: "total_price", type: "DOUBLE" },
    { name: "order_date", type: "DATE" },
  ],
  transactions: [
    { name: "transaction_id", type: "INT" },
    { name: "user_id", type: "INT" },
    { name: "transaction_amount", type: "DOUBLE" },
  ],
};

export default function QueryBuilder() {
  const [selectedTable, setSelectedTable] = useState("sales");
  const [selectedFields, setSelectedFields] = useState([]);
  const [selectedMode, setSelectedMode] = useState("singleTable");
  const fieldOptions = schemas[selectedTable].map((field) => ({
    value: field.name,
    label: `${field.name} (${field.type})`,
  }));

  return (
    <div className="max-w-5xl mx-auto mt-8 relative min-h-screen">
      {/* Query Mode Selection */}
      <div className="flex gap-3 mb-5">
        {queryModes.map((mode) => (
          <Button
            key={mode.id}
            variant={selectedMode === mode.id ? "default" : "outline"}
            onClick={() => setSelectedMode(mode.id)}
          >
            {mode.title}
          </Button>
        ))}
      </div>

      {/* Dynamic Form Based on Selected Mode */}
      <Card className="bg-muted text-foreground p-6 shadow-lg border">
        <CardHeader className="text-lg font-semibold border-b pb-2">
          {queryModes.find((q) => q.id === selectedMode)?.title}
        </CardHeader>
        <CardContent className="space-y-5">
          {/* SINGLE TABLE QUERY FORM */}
          {selectedMode === "singleTable" && (
            <>
              <div className="grid grid-cols-3 gap-4 items-center">
                <span className="font-medium">FROM</span>
                <Select value={selectedTable} onValueChange={setSelectedTable}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Table" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(schemas).map((table) => (
                      <SelectItem key={table} value={table}>
                        {table}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-3 gap-4 items-center">
                <span className="font-medium">SELECT</span>
                <ReactSelect
                  isMulti
                  options={fieldOptions}
                  value={selectedFields}
                  onChange={setSelectedFields}
                  placeholder="Select Fields"
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-3 gap-4 items-center">
                <span className="font-medium">GROUP BY</span>
                <ReactSelect
                  isMulti
                  options={fieldOptions}
                  placeholder="Select Group By Fields"
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-3 gap-4 items-center">
                <span className="font-medium">LIMIT</span>
                <Input placeholder="e.g., 100" />
              </div>
            </>
          )}

          {/* NESTED QUERIES FORM */}
          {selectedMode === "nested" && (
            <>
              <div className="grid grid-cols-3 gap-4 items-center">
                <span className="font-medium">SELECT FROM</span>
                <Select value={selectedTable} onValueChange={setSelectedTable}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Table" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(schemas).map((table) => (
                      <SelectItem key={table} value={table}>
                        {table}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-3 gap-4 items-center">
                <span className="font-medium">WHERE</span>
                <Input placeholder="e.g., amount > (SELECT AVG(amount) FROM sales)" />
              </div>
            </>
          )}

          {/* JOINS FORM */}
          {selectedMode === "join" && (
            <>
              <div className="grid grid-cols-3 gap-4 items-center">
                <span className="font-medium">Main Table</span>
                <Select value={selectedTable} onValueChange={setSelectedTable}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Table" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(schemas).map((table) => (
                      <SelectItem key={table} value={table}>
                        {table}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-3 gap-4 items-center">
                <span className="font-medium">JOIN Type</span>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Join Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="INNER">INNER JOIN</SelectItem>
                    <SelectItem value="LEFT">LEFT JOIN</SelectItem>
                    <SelectItem value="RIGHT">RIGHT JOIN</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-3 gap-4 items-center">
                <span className="font-medium">Join Table</span>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Table" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(schemas).map((table) => (
                      <SelectItem key={table} value={table}>
                        {table}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-3 gap-4 items-center">
                <span className="font-medium">ON Condition</span>
                <Input placeholder="e.g., sales.customer = orders.customer_name" />
              </div>
            </>
          )}

          {/* RAW SQL EDITOR */}
          {selectedMode === "raw" && (
            <div className="grid grid-cols-1 gap-4">
              <span className="font-medium">SQL Query</span>
              <textarea
                className="w-full h-32 p-3 border rounded-md"
                placeholder="Write your SQL query here..."
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bottom-Right Badge */}
      <div className="fixed bottom-8 right-8">
        <Badge
          variant="outline"
          className="px-4 py-2 text-sm flex items-center gap-2 border-gray-400 bg-white shadow-lg rounded-xl"
        >
          Powered by 
          <img src={TrinoLogo} alt="Trino Logo" className="h-5 w-auto" />
        </Badge>
      </div>
    </div>
  );
}
