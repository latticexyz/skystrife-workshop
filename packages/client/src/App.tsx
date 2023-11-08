import { toEthAddress } from "@latticexyz/utils";
import { useMUD } from "./MUDContext";
import { Hex } from "viem";

function Player({ address }: { address: Hex }) {
  const {
    network: { tables, useStore },
  } = useMUD();

  const name = useStore((state) =>
    state.getValue(tables.Name, { key: address })
  );

  return <span>{name ? name.value : toEthAddress(address)}</span>;
}

function Stats() {
  const {
    network: { tables, useStore },
  } = useMUD();

  const counts = useStore((state) => {
    const records = state.getRecords(tables.MatchRanking);
    const cs: { [key: Hex]: { won: number; lost: number } } = {};

    Object.values(records).map((record) =>
      record.value.value.map((entity, i) => {
        const owner = state.getValue(tables.OwnedBy, {
          matchEntity: record.key.key,
          entity,
        });

        if (owner) {
          if (!(owner.value in cs)) {
            cs[owner.value] = { won: 0, lost: 0 };
          }
          if (i === 0) {
            cs[owner.value].won++;
          } else if (i === record.value.value.length - 1) {
            cs[owner.value].lost++;
          }
        }
      })
    );

    const arr = Object.entries(cs);
    arr.sort((a, b) => b[1].won - a[1].won);

    return arr;
  });

  return (
    <div className="m-2">
      <div className="text-3xl">Sky Strife Player stats</div>

      <table className="w-full text-xl text-left text-gray-500 dark:text-gray-400">
        <thead className="text-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th>Player</th>
            <th>W/L ratio</th>
            <th>Matches won</th>
            <th>Matches lost</th>
          </tr>
        </thead>
        <tbody>
          {counts
            ? counts.map(([key, { won, lost }]) => (
                <tr key={key}>
                  <td>
                    <Player address={key as Hex} />
                  </td>
                  <td>{won / lost}</td>
                  <td>{won}</td>
                  <td>{lost}</td>
                </tr>
              ))
            : "No ranking yet"}
        </tbody>
      </table>
    </div>
  );
}

export function App() {
  return (
    <div>
      <Stats />
    </div>
  );
}
