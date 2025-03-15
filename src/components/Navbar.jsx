import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";

export default function Navbar({ activeSection, setActiveSection }) {
  const sections = [
    { id: "schema", label: "Table Schema" },
    { id: "properties", label: "Table Properties" },
    { id: "versioning", label: "Versioning & Snapshots" },
    { id: "metrics", label: "Key Metrics" },
  ];

  return (
    <Menubar className="bg-gray-200 p-2 rounded shadow flex">
      console.log(sections);
      {sections.map((section) => (
        <MenubarMenu key={section.id}>
          <MenubarTrigger
            onClick={() => setActiveSection(section.id)}
            className={`px-4 py-2 rounded transition 
              bg-transparent hover:border-2 hover:border-gray-400
              ${activeSection === section.id ? "bg-white shadow" : "bg-gray-200"}`}
          >
            {section.label}
          </MenubarTrigger>
        </MenubarMenu>
      ))}
    </Menubar>
  );
}
