import { useMUD } from "../MUDContext";
import { Hex } from "viem";

export function useUnits(matchEntity: Hex) {
  const {
    network: { tables, useStore },
  } = useMUD();

  const units = useStore((store) => {
    const positions = Object.values(store.getRecords(tables.Position));

    return positions
      .filter((record) => record.key.matchEntity === matchEntity)
      .map(({ key, value }) => {
        const structureType = store.getValue(tables.StructureType, key);
        const unitType = store.getValue(tables.UnitType, key);
        return { position: value, structureType, unitType };
      });
  });

  return units;
}
