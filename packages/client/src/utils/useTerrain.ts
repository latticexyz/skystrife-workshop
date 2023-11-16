import { useMUD } from "../MUDContext";
import { Hex } from "viem";

export function useTerrain(matchEntity: Hex) {
  const {
    network: { tables, useStore },
  } = useMUD();

  const terrain = useStore((store) => {
    const matchConfig = store.getValue(tables.MatchConfig, {
      key: matchEntity,
    });

    if (matchConfig) {
      const { levelId } = matchConfig;
      const templateIds = store.getValue(tables.LevelTemplates, {
        key: levelId,
      });

      if (templateIds) {
        return Object.values(templateIds.value).map((templateId, i) => {
          const position = store.getValue(tables.LevelPosition, {
            levelId,
            index: BigInt(i),
          });

          if (position) return { templateId, position };

          return { templateId, position: { x: 0, y: 0 } };
        });
      }

      return [];
    }

    return [];
  });

  return terrain;
}
