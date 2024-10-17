"use client";
import IconCloud from "./magicui/icon-cloud";

const customImages = [
  "/images/aws1.png",
  "/images/intel.png",
  "/images/microsoft.png",
  "/images/nasscom1.png",
  "/images/unity1.png",
  "/images/github1.png",
  "/images/futhure1.png",
  "/images/Oculus-Logo1.png",
  "/images/flutter1.png",
  "/images/firefox1.png",
  "/images/vuforia.png"

  

  // Add more custom image paths as needed
];

function IconCloudDemo() {
  return (
    <div className="relative flex h-full w-full max-w-[32rem] items-center justify-center overflow-hidden rounded-lg border bg-background px-20 pb-20 pt-8">
      <IconCloud imageUrls={customImages} />
    </div>
  );
}

export default IconCloudDemo;
