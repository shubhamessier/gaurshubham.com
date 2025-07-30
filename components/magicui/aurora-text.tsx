"use client";

import React, { memo } from "react";

interface AuroraTextProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  speed?: number; // Speed is inversely proportional to animation duration (higher speed = faster animation)
}

export const AuroraText = memo(
  ({
    children,
    className = "",
    // Adjusted colors to match the light blue, purple, and subtle pink/white tones from the video
    colors = ["#87CEEB", "#9370DB", "#E0BBE4", "#FFFFFF", "#FFDAB9"], // Sky Blue, Medium Purple, Lavender, White, PeachPuff
    // Significantly increased speed to make the animation much faster, as seen in the video
    speed = 40, // A higher value results in a faster animation (e.g., 1/20s = 0.05s duration)
  }: AuroraTextProps) => {
    const gradientStyle = {
      // Create a linear gradient using the provided colors, looping back to the first color
      backgroundImage: `linear-gradient(90deg, ${colors.join(", ")}, ${
        colors[0]
      })`,
      WebkitBackgroundClip: "text", // Clip the background to the text shape
      WebkitTextFillColor: "transparent", // Make the text transparent to show the clipped background
      animationDuration: `${1 / speed}s`, // Calculate animation duration based on speed (e.g., 1/20s = 0.05s)
    };

    return (
      <span className={`relative inline-block ${className}`}>
        {/* sr-only for accessibility: screen readers will read the actual text */}
        <span className="sr-only">{children}</span>
        {/* The visible animated text */}
        <span
          className="relative animate-aurora bg-[length:200%_auto] bg-clip-text text-transparent"
          style={gradientStyle}
          aria-hidden="true" // Hide from screen readers as sr-only span provides content
        >
          {children}
        </span>
      </span>
    );
  },
);

AuroraText.displayName = "AuroraText";
