import { useMUD } from "./MUDContext";
import { Place } from "./Place";

export function Leaderboard() {
  const {
    network: { tables, useStore },
  } = useMUD();

  const rankings = useStore((state) => state.getRecords(tables.MatchRanking));

  return (
    <div className="m-1">
      <div className="text-2xl">Leaderboard</div>
      {Object.values(rankings).map(({ key, value }) => (
        <div key={key.key} className="m-1 p-2 border-2">
          <div className="text-xl">Match #{key.key.slice(2, 10)}:</div>
          {value.value.map((entity, i) => (
            <div key={`${key}_${i}`}>
              <Place index={i} />: {entity}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
