import * as React from "react";
import Svg, { Path, Circle } from "react-native-svg";

type IconProps = {
  size?: number;
  color?: string;
};

export function RoseIcon({ size = 24, color = "currentColor" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Rose petals */}
      <Path
        d="M12 21c0-2.5-2-4-4-4s-3 1.5-3 4c0 0 1-1 3.5-1S12 21 12 21z"
        fill={color}
        opacity="0.3"
      />
      <Path
        d="M12 21c0-2.5 2-4 4-4s3 1.5 3 4c0 0-1-1-3.5-1S12 21 12 21z"
        fill={color}
        opacity="0.3"
      />
      <Circle cx="12" cy="12" r="4" stroke={color} strokeWidth="2" />
      <Path
        d="M12 8c-1-2-3-3-5-3-1 0-2 .5-2 1.5C5 8 6.5 9 8 9.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M12 8c1-2 3-3 5-3 1 0 2 .5 2 1.5C19 8 17.5 9 16 9.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Stem */}
      <Path
        d="M12 16v5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M12 18l-2 1"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function LilyIcon({ size = 24, color = "currentColor" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Lily petals */}
      <Path
        d="M12 3l-3 8h6l-3-8z"
        stroke={color}
        strokeWidth="2"
        fill={color}
        opacity="0.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 11c-3 0-5 2-5 4s2 2 5 2"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M15 11c3 0 5 2 5 4s-2 2-5 2"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M12 11v6"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Pistil */}
      <Circle cx="12" cy="14" r="1.5" fill={color} />
      {/* Stem */}
      <Path
        d="M12 17v4"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
}
