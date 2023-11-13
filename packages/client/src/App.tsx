import { useMUD } from "./MUDContext";

export function App() {
  const {
    network: { tables, useStore },
  } = useMUD();

  const rankings = useStore((state) => state.getRecords(tables.MatchRanking));

  return (
    <div>
      {Object.values(rankings).map((record) => (
        <div key={record.key.key}>
          Match #{record.key.key}:
          {record.value.value.map((entity, i) => (
            <div key={`${record.key.key}_${entity}`}>
              {i + 1}: {entity}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
