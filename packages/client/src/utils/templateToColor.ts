import { Hex } from "viem";

const GRASS_TEMPLATE =
  "0x4772617373000000000000000000000000000000000000000000000000000000";
const FOREST_TEMPLATE =
  "0x466f726573740000000000000000000000000000000000000000000000000000";

export function templateToColor(templateId: Hex) {
  return templateId === GRASS_TEMPLATE
    ? "#59A608"
    : templateId === FOREST_TEMPLATE
      ? "#228b22"
      : "gray"
}