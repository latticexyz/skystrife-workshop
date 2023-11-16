import { useTexture } from "@react-three/drei";
import { NearestFilter, sRGBEncoding } from "three";

const FILES = [
  "./archer.png",
  "./swordman.png",
  "./golem.png",
  "./rider.png",
  "./knight.png",
  "./pikeman.png",
  "./mine.png",
  "./settlement.png",
  "./village.png",
  "./wooden-barricade.png",
];

export function useSkyStrifeTextures() {
  const textures = useTexture(FILES);

  textures.forEach((t) => {
    t.minFilter = NearestFilter;
    t.magFilter = NearestFilter;
    t.encoding = sRGBEncoding;
  });

  return textures;
}
