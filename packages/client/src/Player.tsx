import { toEthAddress } from "@latticexyz/utils";
import { Hex } from "viem";
import { useMUD } from "./MUDContext";
import { useState } from "react";

export function Player({ entity }: { entity: Hex }) {
  const {
    network: { tables, useStore },
  } = useMUD();

  const [hover, setHover] = useState(false);

  const name = useStore((state) =>
    state.getValue(tables.Name, { key: entity })
  );
  const inLeague = useStore((state) =>
    state.getValue(tables.InLeague, { account: toEthAddress(entity) as Hex })
  );

  return (
    <span
      className={`w-full ${
        inLeague && inLeague.isMember ? "text-yellow-600" : null
      }`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {hover ? (
        <span>{toEthAddress(entity)}</span>
      ) : (
        <span>{name ? name.value : toEthAddress(entity)}</span>
      )}{" "}
      {inLeague && inLeague.isMember ? "👪" : null}
    </span>
  );
}
