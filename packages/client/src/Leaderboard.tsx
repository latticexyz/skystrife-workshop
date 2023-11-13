import { useMUD } from "./MUDContext";
import { Place } from "./Place";
import { Player } from "./Player";

export function Leaderboard() {
  const {
    network: { tables, useStore },
  } = useMUD();

  const rankings = useStore((state) => {
    return Object.values(state.getRecords(tables.MatchRanking)).map(
      ({ key, value }) => {
        const matchEntity = key.key;
        const players = value.value.map((entity) => {
          const owner = state.getValue(tables.OwnedBy, {
            matchEntity: key.key,
            entity,
          });

          if (owner) return owner.value;

          return entity;
        });

        return {
          matchEntity,
          players,
        };
      }
    );
  });

  return (
    <div className="m-1">
      <div className="text-2xl">Leaderboard</div>
      {rankings.map(({ matchEntity, players }) => (
        <div key={matchEntity} className="m-1 p-2 border-2">
          <div className="text-xl">Match #{matchEntity.slice(2, 10)}:</div>
          {players.map((address, i) => (
            <div key={`${matchEntity}_${address}`}>
              <Place index={i} />: <Player entity={address} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
