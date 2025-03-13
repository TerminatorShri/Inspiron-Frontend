import { File, Folder, Tree } from "./magicui/file-tree";
import {
  Table,
  Package,
  Settings,
  List,
  Layers,
  History,
  BarChart,
  Info,
  Telescope,
} from "lucide-react";

const ELEMENTS = [
  {
    id: "1",
    isSelectable: false,
    name: "Tables",
    children: [
      {
        id: "2",
        isSelectable: true,
        name: "Sales",
        children: [
          {
            id: "3",
            name: "Schemas",
            icon: <List className="w-4 h-4 mr-2 text-blue-400" />,
          },
          {
            id: "4",
            name: "Properties",
            icon: <Info className="w-4 h-4 mr-2 text-blue-400" />,
          },
          {
            id: "5",
            name: "Partition Details",
            icon: <Layers className="w-4 h-4 mr-2 text-blue-400" />,
          },
          {
            id: "6",
            name: "Versioning & Snapshots",
            icon: <History className="w-4 h-4 mr-2 text-blue-400" />,
          },
          {
            id: "7",
            name: "Key Metrics",
            icon: <BarChart className="w-4 h-4 mr-2 text-blue-400" />,
          },
        ],
      },
      {
        id: "8",
        isSelectable: true,
        name: "Orders",
        children: [
          {
            id: "9",
            name: "Schemas",
            icon: <List className="w-4 h-4 mr-2 text-blue-400" />,
          },
          {
            id: "10",
            name: "Properties",
            icon: <Info className="w-4 h-4 mr-2 text-blue-400" />,
          },
          {
            id: "11",
            name: "Partition Details",
            icon: <Layers className="w-4 h-4 mr-2 text-blue-400" />,
          },
          {
            id: "12",
            name: "Versioning & Snapshots",
            icon: <History className="w-4 h-4 mr-2 text-blue-400" />,
          },
          {
            id: "13",
            name: "Key Metrics",
            icon: <BarChart className="w-4 h-4 mr-2 text-blue-400" />,
          },
        ],
      },
      {
        id: "14",
        isSelectable: true,
        name: "Transactions",
        children: [
          {
            id: "15",
            name: "Schemas",
            icon: <List className="w-4 h-4 mr-2 text-blue-400" />,
          },
          {
            id: "16",
            name: "Properties",
            icon: <Info className="w-4 h-4 mr-2 text-blue-400" />,
          },
          {
            id: "17",
            name: "Partition Details",
            icon: <Layers className="w-4 h-4 mr-2 text-blue-400" />,
          },
          {
            id: "18",
            name: "Versioning & Snapshots",
            icon: <History className="w-4 h-4 mr-2 text-blue-400" />,
          },
          {
            id: "19",
            name: "Key Metrics",
            icon: <BarChart className="w-4 h-4 mr-2 text-blue-400" />,
          },
        ],
      },
    ],
  },
];

export default function Sidebar({
  selectedTable,
  setSelectedTable,
  setActiveSection,
  openSettings,
}) {
  return (
    <div className="w-80 bg-gray-900 text-white p-4 flex flex-col h-screen">
      {/* App Title */}
      <div className="text-2xl font-bold text-white text-center pb-4 border-b border-gray-700 flex items-center justify-center gap-2">
        <Telescope className="w-6 h-6 text-blue-400" /> Metastore
      </div>

      {/* Scrollable Content */}
      <div className="flex-grow overflow-y-auto mt-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-thumb-blue-500 scrollbar-thin scroll-smooth">
        <Tree
          className="text-gray-300"
          initialSelectedId="2"
          initialExpandedItems={["1", "2"]} // ✅ Auto-expand first table
          elements={ELEMENTS}
          openIcon={<Package className="w-4 h-4 mr-2 text-blue-400" />}
          closeIcon={<Package className="w-4 h-4 mr-2 text-blue-400" />}
        >
          <Folder element="Tables" value="1" className="p-1">
            {ELEMENTS[0].children.map((table) => (
              <Folder
                key={table.id}
                value={table.id}
                element={table.name}
                className={`p-2 rounded-lg transition ${
                  selectedTable === table.name
                    ? "bg-blue-600/30 text-white font-bold"
                    : "bg-transparent text-gray-300 hover:bg-blue-500/20"
                }`}
                onClick={() => setSelectedTable(table.name)}
                openIcon={<Table className="w-4 h-4 mr-2 text-blue-400" />}
                closeIcon={<Table className="w-4 h-4 mr-2 text-blue-400" />}
              >
                {table.children.map((option) => (
                  <File
                    key={option.id}
                    value={option.id}
                    className={`p-2 pl-6 rounded-lg transition ${
                      option.name === selectedTable
                        ? "bg-blue-600/20 text-white font-bold"
                        : "bg-transparent text-gray-300 hover:bg-blue-500/20"
                    }`}
                    onClick={() => setActiveSection(option.name)}
                    fileIcon={option.icon}
                  >
                    {option.name}
                  </File>
                ))}
              </Folder>
            ))}
          </Folder>
        </Tree>
      </div>

      {/* Settings Button */}
      <button
        onClick={openSettings}
        className="flex items-center gap-2 p-4 text-gray-300 hover:bg-blue-500/20 rounded transition mt-2"
      >
        <Settings className="w-5 h-5 text-blue-400" />
        <span>Settings</span>
      </button>
    </div>
  );
}
