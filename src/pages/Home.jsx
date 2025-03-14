import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconCloudDemo } from "@/components/IconCloud";

export default function Home() {
  const [s3Path, setS3Path] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (s3Path.trim() !== "") {
      navigate(`/metadata?s3Path=${encodeURIComponent(s3Path)}`);
    }
  };

  return (
    <div className="h-screen flex bg-gray-900 text-white">
      {/* Left Section - Icon Cloud */}
      <div className="w-1/2 flex items-center justify-center border-r border-gray-700 bg-black-500">
        <IconCloudDemo />
      </div>

      {/* Right Section - S3 Path Input */}
      <div className="w-1/2 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-6">Enter S3 Path</h1>
        <input
          type="text"
          value={s3Path}
          onChange={(e) => setS3Path(e.target.value)}
          placeholder="e.g., s3://my-bucket-name/"
          className="border border-gray-500 p-3 rounded-lg text-black w-96"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 mt-4 rounded-lg"
        >
          Load Metadata
        </button>
      </div>
    </div>
  );
}
