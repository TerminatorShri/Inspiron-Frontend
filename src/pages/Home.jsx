import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconCloudDemo } from "@/components/IconCloud";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Telescope } from "lucide-react";
import AwsLogo from "@/assets/aws.svg";
import AzureLogo from "@/assets/azure.svg";
import MinioLogo from "@/assets/minio.svg";
import CloudflareLogo from "@/assets/cloudflare.png";

export default function Home() {
  const [selectedProvider, setSelectedProvider] = useState("");
  const [s3Path, setS3Path] = useState("");
  const [bucketName, setBucketName] = useState("");
  const [region, setRegion] = useState("");
  const [accessKeyId, setAccessKeyId] = useState("");
  const [secretAccessKey, setSecretAccessKey] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/metadata?s3Path=${encodeURIComponent(s3Path)}`);
  };

  const cloudProviders = [
    { id: "aws", name: "AWS", logo: AwsLogo },
    { id: "azure", name: "Azure", logo: AzureLogo },
    { id: "cloudflare", name: "Cloudflare R2", logo: CloudflareLogo },
    { id: "custom", name: "Custom", logo: MinioLogo },
  ];

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 p-10 space-y-6">
      {/* Upper Half: MetaLens Info */}
      <Card className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-6">
        <CardContent className="text-center flex items-center justify-center gap-3">
          <Telescope className="w-8 h-8 text-blue-600" />
          <h1 className="text-4xl font-bold text-gray-800 rowdy-font">
            MetaLens
          </h1>
        </CardContent>
        <CardContent className="text-center">
          <p className="text-lg text-gray-600 mt-4 tajawal-font font-semibold">
            A seamless metadata exploration tool powered by Trino. Easily
            connect to S3-compatible storage, build queries, and extract
            insights without writing a single line of code.
          </p>
        </CardContent>
      </Card>

      {/* Lower Half: Icon Cloud + Cloud Badges + Input Fields */}
      <Card className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-6">
        <CardContent className="flex items-center">
          {/* Left: Icon Cloud */}
          <div className="w-1/2 flex items-center justify-center">
            <IconCloudDemo />
          </div>

          {/* Right: Cloud Provider Badges & Input Fields */}
          <div className="w-1/2 flex flex-col justify-center pl-6">
            {/* Cloud Badges - Smaller and Inline */}
            <div className="flex gap-3 mb-4 flex-wrap">
              {cloudProviders.map((provider) => (
                <Badge
                  key={provider.id}
                  className={`tajawal-font px-3 py-2 text-sm font-medium border cursor-pointer flex items-center gap-2 shadow-sm transition-colors duration-200
                    ${
                      selectedProvider === provider.id
                        ? "bg-blue-100 border-blue-500 text-blue-700" // Selected badge (No hover effect)
                        : "bg-white border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600"
                    }`}
                  onClick={() => setSelectedProvider(provider.id)}
                  style={{
                    ...(selectedProvider === provider.id && {
                      pointerEvents: "none", // Prevent hover effect on selected
                    }),
                  }}
                >
                  <img
                    src={provider.logo}
                    alt={provider.name}
                    className="h-4 w-4"
                  />
                  {provider.name}
                </Badge>
              ))}
            </div>

            {/* Input Fields */}
            <div className="grid grid-cols-2 gap-4 kanit-regular">
              {selectedProvider === "custom" && (
                <Input
                  placeholder="Enter URL for S3-compatible storage"
                  value={s3Path}
                  onChange={(e) => setS3Path(e.target.value)}
                  className="col-span-2"
                />
              )}
              <Input
                placeholder="Bucket Name"
                value={bucketName}
                onChange={(e) => setBucketName(e.target.value)}
              />
              <Input
                placeholder="Region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              />
              <Input
                placeholder="Access Key ID"
                value={accessKeyId}
                onChange={(e) => setAccessKeyId(e.target.value)}
              />
              <Input
                placeholder="Secret Access Key"
                type="password"
                value={secretAccessKey}
                onChange={(e) => setSecretAccessKey(e.target.value)}
              />
            </div>

            {/* Explore Button */}
            <div className="flex justify-center mt-6">
              <Button
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg kanit-semibold"
              >
                Explore Metadata
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
