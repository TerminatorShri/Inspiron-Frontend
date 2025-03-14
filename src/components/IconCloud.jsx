import { IconCloud } from "./magicui/icon-cloud";

// Function to shuffle the array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
}

const slugs = [
  "amazondocumentdb",
  "postgresql",
  "apachehive",
  "amazons3",
  "docker",
  "amazonredshift",
  "mysql",
  "amazonwebservices",
  "trino",
  "sqlite",
  "googlecloudstorage",
  "amazondynamodb",
  "minio",
  "microsoftazure",
  "amazonrds",
  "snowflake",
  "apacheparquet",
  "mariadb",
  "amazonelasticache",
];

// Shuffle slugs array
shuffleArray(slugs);

export function IconCloudDemo() {
  const images = slugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
  );

  return (
    <div className="relative flex size-full items-center justify-center overflow-hidden">
      <IconCloud images={images} />
    </div>
  );
}
