"use client";
import { useMemo } from "react";
import { useTheme } from "next-themes";
import { Cloud } from "react-icon-cloud";
import Image from "next/image"; // Import the Image component

export const cloudProps = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      paddingTop: 40,
    },
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    activeCursor: "default",
    tooltip: "native",
    initial: [0.1, -0.1],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#0000",
    maxSpeed: 0.04,
    minSpeed: 0.02,
  },
};

export default function IconCloud({ imageUrls = [] }) {
  const { theme } = useTheme();

  // Convert image URLs into cloud-compatible elements
  const renderedImages = useMemo(() => {
    return imageUrls.map((url, index) => (
      <a key={index} href="#" onClick={(e) => e.preventDefault()}>
        <Image
          src={url}
          alt={`Custom icon ${index}`}
          width={42} // Set the desired width
          height={42} // Set the desired height
          style={{
            borderRadius: "50%",
            objectFit: "cover",
            padding: 5,
            backgroundColor: theme === "light" ? "#f3f2ef" : "#080510",
          }}
          onError={(e) => {
            // Hide broken images
            e.currentTarget.style.display = "none";
          }}
        />
      </a>
    ));
  }, [imageUrls, theme]);

  return (
    <Cloud {...cloudProps}>
      {renderedImages}
    </Cloud>
  );
}
