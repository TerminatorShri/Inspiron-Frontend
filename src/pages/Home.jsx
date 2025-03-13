import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [s3Path, setS3Path] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (s3Path.trim() !== "") {
      navigate(`/metadata?s3Path=${encodeURIComponent(s3Path)}`);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Enter S3 Path</h1>
      <input
        type="text"
        value={s3Path}
        onChange={(e) => setS3Path(e.target.value)}
        placeholder="e.g., s3://my-bucket-name/"
        className="border border-gray-500 p-2 rounded-lg text-black w-96"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mt-4 rounded-lg"
      >
        Load Metadata
      </button>
    </div>
  );
}
