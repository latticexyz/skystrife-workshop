import { useMUD } from "./MUDContext";
import { Hex } from "viem";

function Match({ matchEntity }: { matchEntity: Hex }) {
  const {
    network: { tables, useStore },
  } = useMUD();

  const index = useStore((state) =>
    state.getValue(tables.MatchIndex, { matchEntity })
  );

  return (
    <div className="text-xl">
      Match #{index ? index.matchIndex : matchEntity} ({matchEntity})
    </div>
  );
}

export function App() {
  const {
    network: { tables, useStore },
  } = useMUD();

  const matches = useStore((state) => state.getRecords(tables.MatchConfig));

  return (
    <div>
      <div className="text-3xl">Sky Strife matches</div>

      <div className="m-2">
        {Object.values(matches).map((record) => (
          <div key={record.id}>
            <Match matchEntity={record.key.key} />
          </div>
        ))}
      </div>
    </div>
  );
}
