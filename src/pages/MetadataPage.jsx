import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import TableSchema from "@/components/TableSchema";
import TableProperties from "@/components/TableProperties";
import PartitionDetails from "@/components/PartitionDetails";
import Versioning from "@/components/Versioning";
import KeyMetrics from "@/components/KeyMetrics";
import SettingsPage from "@/components/SettingsPage";
import { Toaster } from "sonner";

export default function MetadataPage() {
  const [selectedTable, setSelectedTable] = useState("Sales");
  const [activeSection, setActiveSection] = useState("Schemas"); // Default to "Schemas"
  const [isSettingsOpen, setIsSettingsOpen] = useState(false); // ✅ Track if settings is open

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Wider and Handles Navigation */}
      <Sidebar
        selectedTable={selectedTable}
        setSelectedTable={setSelectedTable}
        setActiveSection={setActiveSection} // ✅ Handle navigation from sidebar
        openSettings={() => setIsSettingsOpen(true)} // ✅ Open settings on click
      />

      {/* Main Content - Switch Between Metadata & Settings */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {isSettingsOpen ? (
          <SettingsPage closeSettings={() => setIsSettingsOpen(false)} /> // ✅ Show Settings Page
        ) : (
          <div className="flex-1 overflow-auto px-6 pb-6">
            <div className="p-4 shadow rounded bg-white">
              {activeSection === "Schemas" && (
                <TableSchema selectedTable={selectedTable} />
              )}
              {activeSection === "Properties" && (
                <TableProperties selectedTable={selectedTable} />
              )}
              {activeSection === "Partition Details" && (
                <PartitionDetails selectedTable={selectedTable} />
              )}
              {activeSection === "Versioning & Snapshots" && (
                <Versioning selectedTable={selectedTable} />
              )}
              {activeSection === "Key Metrics" && (
                <KeyMetrics selectedTable={selectedTable} />
              )}
            </div>
          </div>
        )}
        <Toaster />
      </div>
    </div>
  );
}
