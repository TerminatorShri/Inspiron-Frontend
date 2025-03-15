import { File, Folder, Tree } from "./magicui/file-tree";
import {
  FileCode,
  Package,
  Settings,
  List,
  Layers,
  History,
  BarChart,
  Info,
  Telescope,
  Database,
  CodeXml,
} from "lucide-react";

const ELEMENTS = [
  {
    id: "1",
    isSelectable: false,
    name: "Tables",
    children: ["Sales", "Orders", "Transactions"].map((tableName, index) => ({
      id: `${index + 2}`,
      isSelectable: true,
      name: tableName,
      children: [
        {
          id: `schemas-${tableName}`,
          name: "Schemas",
          icon: <List className="w-4 h-4 mr-2 text-blue-400" />,
        },
        {
          id: `properties-${tableName}`,
          name: "Properties",
          icon: <Info className="w-4 h-4 mr-2 text-blue-400" />,
        },
      
        {
          id: `versioning-${tableName}`,
          name: "Versioning & Snapshots",
          icon: <History className="w-4 h-4 mr-2 text-blue-400" />,
        },
        {
          id: `metrics-${tableName}`,
          name: "Key Metrics",
          icon: <BarChart className="w-4 h-4 mr-2 text-blue-400" />,
        },
      ],
    })),
  },
  {
    id: "execute-sql",
    isSelectable: false,
    name: "Execute SQL",
    icon: <Database className="w-4 h-4 mr-2 text-green-400" />,
    children: [
      {
        id: "run-sql",
        name: "Run Query",
        icon: <FileCode className="w-4 h-4 mr-2 text-blue-400" />,
      },
    ],
  },
];

export default function Sidebar({
  selectedTable,
  setSelectedTable,
  setActiveSection,
  setIsSettingsOpen,
}) {
  return (
    <div className="w-80 bg-gray-900 text-white p-4 flex flex-col h-screen">
      {/* App Title */}
      <div className="text-2xl font-bold text-white text-center pb-4 border-b border-gray-700 flex items-center justify-center gap-2">
        <Telescope className="w-6 h-6 text-blue-400" />{" "}
        <span className="rowdy-font">MetaLens</span>
      </div>

      <div className="flex-grow overflow-y-auto mt-4 scrollbar-thin scrollbar-thumb-blue-500 scroll-smooth">
        <Tree
          className="text-gray-300 kanit-medium"
          initialSelectedId="2"
          initialExpandedItems={["1", "execute-sql"]}
          elements={ELEMENTS}
          openIcon={<Package className="w-4 h-4 mr-2 text-blue-400" />}
          closeIcon={<Package className="w-4 h-4 mr-2 text-blue-400" />}
        >
          {/* Tables Section */}
          <Folder element="Tables" value="1" className="p-1 text-lg">
            {ELEMENTS[0].children.map((table) => (
              <Folder
                key={table.id}
                value={table.id}
                element={table.name}
                className={`p-2 rounded-lg transition text-md ${
                  selectedTable === table.name
                    ? "bg-blue-600/30 text-white font-bold"
                    : "hover:bg-blue-500/20"
                }`}
                onClick={() => setSelectedTable(table.name)}
              >
                {table.children.map((option) => (
                  <File
                    key={option.id}
                    value={option.id}
                    className={`p-2 pl-6 rounded-lg transition kanit-regular ${
                      option.name === selectedTable
                        ? "bg-blue-600/20 text-white font-bold"
                        : "hover:bg-blue-500/20"
                    }`}
                    onClick={() => {
                      setActiveSection(option.name);
                      setIsSettingsOpen(false);
                    }}
                    fileIcon={option.icon}
                  >
                    {option.name}
                  </File>
                ))}
              </Folder>
            ))}
          </Folder>

          {/* Execute SQL Section */}
          <Folder
            element="Execute SQL"
            value="execute-sql"
            className="p-1 text-lg"
            openIcon={<CodeXml className="w-4 h-4 mr-2 text-blue-400" />}
            closeIcon={<CodeXml className="w-4 h-4 mr-2 text-blue-400" />}
          >
            <File
              key="run-sql"
              value="run-sql"
              className="p-2 rounded-lg transition hover:bg-blue-500/20"
              fileIcon={<FileCode className="w-4 h-4 text-blue-400" />}
              onClick={() => setActiveSection("Run Query")}
            >
              Run Query
            </File>
          </Folder>
        </Tree>
      </div>

      {/* Settings Button */}
      <button
        onClick={() => setIsSettingsOpen(true)}
        className="flex items-center gap-2 p-4 text-gray-300 hover:bg-blue-500/20 rounded transition mt-2"
      >
        <Settings className="w-5 h-5 text-blue-400" />
        <span className="kanit-medium">Settings</span>
      </button>
    </div>
  );
}
