import { useMUD } from "./MUDContext";
import { Hex } from "viem";

function Player({ entity }: { entity: Hex }) {
  const {
    network: { tables, useStore },
  } = useMUD();

  const name = useStore((state) =>
    state.getValue(tables.Name, { key: entity })
  );

  return <span>{name ? name.value : entity}</span>;
}

export function App() {
  const {
    network: { tables, useStore },
  } = useMUD();

  const rankings = useStore((state) => {
    return Object.values(state.getRecords(tables.MatchRanking)).map(
      ({ key, value }) => ({
        matchEntity: key.key,
        players: value.value.map((entity) => {
          const owner = state.getValue(tables.OwnedBy, {
            matchEntity: key.key,
            entity,
          });

          if (owner) return owner.value;

          return entity;
        }),
      })
    );
  });

  return (
    <div>
      <div className="text-xl">Rankings</div>
      {rankings.map(({ matchEntity, players }) => (
        <div key={matchEntity}>
          <div key={matchEntity} className="text-lg">
            Match #{matchEntity}:
          </div>
          {players.map((address, i) => (
            <div key={`${matchEntity}_${address}`}>
              {i + 1}: <Player entity={address} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
