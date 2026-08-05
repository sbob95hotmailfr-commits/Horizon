import sharp from "sharp";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const svg = readFileSync(new URL("../public/icons/icon-maskable.svg", import.meta.url));

const sizes = [
  { size: 192, name: "icon-192.png" },
  { size: 512, name: "icon-512.png" },
  { size: 180, name: "apple-touch-icon.png" },
];

for (const { size, name } of sizes) {
  await sharp(svg)
    .resize(size, size)
    .png()
    .toFile(fileURLToPath(new URL(`../public/icons/${name}`, import.meta.url)));
  console.log(`generated ${name}`);
}
