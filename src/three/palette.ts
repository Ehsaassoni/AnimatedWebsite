import * as THREE from "three";

export type ScenePalette = {
  lineBright: string;
  lineBase: string;
  lineFaint: string;
  dot: string;
  glow: string;
  blending: THREE.Blending;
  opacityMult: number;
};

export function getScenePalette(theme: "dark" | "light"): ScenePalette {
  if (theme === "light") {
    return {
      lineBright: "#3730a3",
      lineBase: "#4338ca",
      lineFaint: "#4f46e5",
      dot: "#4338ca",
      glow: "#4338ca",
      blending: THREE.NormalBlending,
      opacityMult: 1.9,
    };
  }
  return {
    lineBright: "#a9a9ff",
    lineBase: "#5b5bf0",
    lineFaint: "#7c7cff",
    dot: "#e8e8ff",
    glow: "#5b5bf0",
    blending: THREE.AdditiveBlending,
    opacityMult: 1,
  };
}

export function makeDotTexture(color: string) {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0, color);
  grad.addColorStop(0.45, color);
  grad.addColorStop(1, "transparent");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}
