import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconCloudDemo } from "@/components/IconCloud";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Telescope, Sparkles, Rocket } from "lucide-react";
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
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 p-10 space-y-8 relative overflow-hidden">
      <Sparkles className="absolute top-10 left-10 w-20 h-20 text-indigo-300 opacity-63 animate-pulse" />
      <Rocket className="absolute bottom-10 right-10 w-16 h-16 text-indigo-300 animate-zoom" />

      {/* Upper Card - MetaLens Info */}
      <Card className="w-full max-w-6xl bg-white shadow-xl rounded-3xl p-10 relative">
        <CardContent className="text-center flex items-center justify-center gap-4">
          <Telescope className="w-10 h-10 text-blue-600" />
          <h1 className="text-5xl font-bold text-gray-800 rowdy-font">
            MetaLens
          </h1>
        </CardContent>
        <CardContent className="text-center">
          <p className="text-lg text-gray-700 mt-4 tajawal-font font-semibold">
            A seamless metadata exploration tool powered by Trino. Easily
            connect to S3-compatible storage, build queries, and extract
            insights without writing a single line of code.
          </p>
        </CardContent>
      </Card>

      {/* Lower Card - Icon Cloud & Cloud Provider Inputs */}
      <Card className="w-full max-w-6xl bg-white shadow-xl rounded-3xl p-10 relative">
        <CardContent className="flex items-center">
          {/* Left: Icon Cloud */}
          <div className="w-1/2 flex items-center justify-center relative">
            <IconCloudDemo className="animate-fade-in" />
          </div>

          {/* Right: Cloud Provider Selection & Inputs */}
          <div className="w-1/2 flex flex-col justify-center pl-6 space-y-6">
            {/* Cloud Provider Badges */}
            <div className="flex gap-3 mb-4 flex-nowrap overflow-hidden">
              {cloudProviders.map((provider) => (
                <Badge
                  key={provider.id}
                  className={`tajawal-font px-4 py-3 text-base font-medium border cursor-pointer flex items-center gap-2 shadow-md rounded-xl transition-transform transform hover:scale-105 whitespace-nowrap
                    ${
                      selectedProvider === provider.id
                        ? "bg-blue-100 border-blue-500 text-blue-700"
                        : "bg-white border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600"
                    }`}
                  onClick={() => setSelectedProvider(provider.id)}
                  style={{
                    ...(selectedProvider === provider.id && {
                      pointerEvents: "none",
                    }),
                  }}
                >
                  <img
                    src={provider.logo}
                    alt={provider.name}
                    className="h-6 w-6"
                  />
                  {provider.name}
                </Badge>
              ))}
            </div>

            {/* Input Fields */}
            <div className="grid grid-cols-2 gap-4 kanit-regular">
              {selectedProvider === "custom" && (
                <Input
                  placeholder="Enter S3-Compatible Storage URL"
                  value={s3Path}
                  onChange={(e) => setS3Path(e.target.value)}
                  className="col-span-2 shadow-md rounded-lg"
                />
              )}
              <Input
                placeholder="Bucket Name"
                value={bucketName}
                onChange={(e) => setBucketName(e.target.value)}
                className="shadow-md rounded-lg"
              />
              <Input
                placeholder="Region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="shadow-md rounded-lg"
              />
              <Input
                placeholder="Access Key ID"
                value={accessKeyId}
                onChange={(e) => setAccessKeyId(e.target.value)}
                className="shadow-md rounded-lg"
              />
              <Input
                placeholder="Secret Access Key"
                type="password"
                value={secretAccessKey}
                onChange={(e) => setSecretAccessKey(e.target.value)}
                className="shadow-md rounded-lg"
              />
            </div>

            {/* Explore Button */}
            <div className="flex justify-center mt-6">
              <Button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-md text-lg kanit-semibold shadow-lg transform transition-transform hover:scale-105"
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
