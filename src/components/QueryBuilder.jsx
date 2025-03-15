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
  const [showResults, setShowResults] = useState(false);
  const [sqlQuery, setSqlQuery] = useState("");

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
            className={`px-4 py-2 rounded-lg ${
              selectedMode === mode.id
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
            onClick={() => {
              setSelectedMode(mode.id);
              setShowResults(false);
            }}
          >
            {mode.title}
          </Button>
        ))}
      </div>

      {/* Dynamic Form Based on Selected Mode */}
      <Card className="bg-white text-gray-900 p-6 shadow-lg border rounded-lg">
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
                  <SelectTrigger className="w-full border border-gray-300">
                    <SelectValue placeholder="Select Table" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
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
                <Input
                  placeholder="e.g., 100"
                  className="w-full border border-gray-300"
                />
              </div>
            </>
          )}

          {/* NESTED QUERIES FORM */}
          {selectedMode === "nested" && (
            <>
              <div className="grid grid-cols-3 gap-4 items-center">
                <span className="font-medium">SELECT FROM</span>
                <Select value={selectedTable} onValueChange={setSelectedTable}>
                  <SelectTrigger className="w-full border border-gray-300">
                    <SelectValue placeholder="Select Table" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {Object.keys(schemas).map((table) => (
                      <SelectItem key={table} value={table}>
                        {table}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-3 gap-4 items-center">
                <span className="font-medium">WHERE Condition</span>
                <Input
                  placeholder="e.g., amount > (SELECT AVG(amount) FROM sales)"
                  className="w-full border border-gray-300"
                />
              </div>
            </>
          )}

          {/* JOINS FORM */}
          {selectedMode === "join" && (
            <>
              <div className="grid grid-cols-3 gap-4 items-center">
                <span className="font-medium">Main Table</span>
                <Select value={selectedTable} onValueChange={setSelectedTable}>
                  <SelectTrigger className="w-full border border-gray-300">
                    <SelectValue placeholder="Select Table" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
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
                  <SelectTrigger className="w-full border border-gray-300">
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
                <span className="font-medium">ON Condition</span>
                <Input
                  placeholder="e.g., sales.id = "
                  className="w-full border border-gray-300"
                />
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
                value={sqlQuery}
                onChange={(e) => setSqlQuery(e.target.value)}
              />
            </div>
          )}

          {/* EXECUTE QUERY BUTTON */}
          <div className="flex justify-center">
            <Button
              onClick={() => setShowResults(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
            >
              Execute Query
            </Button>
          </div>

          {/* RESULT BLOCK */}
          {showResults && (
            <div className="mt-6 p-4 bg-gray-100 border rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">Query Results</h3>
              <p className="text-gray-600">Results will be displayed here...</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bottom-Right Trino Badge */}
      <div className="fixed bottom-6 right-6">
        <Badge
          variant="outline"
          className="px-4 py-2 text-sm flex items-center gap-2 border-gray-400 bg-white shadow-lg rounded-xl"
        >
          <span className="text-lg font-semibold">Powered by</span>
          <img src={TrinoLogo} alt="Trino Logo" className="h-6 w-auto" />
        </Badge>
      </div>
    </div>
  );
}
