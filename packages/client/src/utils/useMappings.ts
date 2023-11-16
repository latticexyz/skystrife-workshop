import { useSkyStrifeTextures } from "./useSkyStrifeTextures";

export function useMappings() {
  const textures = useSkyStrifeTextures();

  const [
    archer,
    swordman,
    golem,
    rider,
    knight,
    pikeman,
    crystal,
    settlement,
    village,
    woodenBarricade,
  ] = textures;

  return {
    UnitTypesToTexture: [
      swordman,
      swordman,
      pikeman,
      golem,
      rider,
      knight,
      swordman,
      archer,
      swordman,
      swordman,
    ],
    StructureTypesToTexture: [
      swordman,
      village,
      settlement,
      crystal,
      crystal,
      woodenBarricade,
      woodenBarricade,
      woodenBarricade,
      woodenBarricade,
      woodenBarricade,
      crystal,
      crystal,
      crystal,
      crystal,
    ],
  };
}
