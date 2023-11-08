import { toEthAddress } from "@latticexyz/utils";
import { useMUD } from "./MUDContext";
import { Hex } from "viem";
import { useState } from "react";

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

  const [league, setLeague] = useState(false);

  const counts = useStore((state) => {
    const accounts = state.getRecords(tables.League_AccountInLeague);

    const records = state.getRecords(tables.MatchRanking);
    const cs: { [key: Hex]: { won: number; lost: number } } = {};

    Object.values(records).map((record) =>
      record.value.value.map((entity, i) => {
        const owner = state.getValue(tables.OwnedBy, {
          matchEntity: record.key.key,
          entity,
        });

        if (
          owner &&
          (!league ||
            Object.values(accounts).some(
              (record) =>
                record.key.account.toLowerCase() ===
                toEthAddress(owner.value).toLowerCase()
            ))
        ) {
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

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setLeague(!league)}
      >
        Toggle league view
      </button>

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
                  <td>{(won / lost).toString()}</td>
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

function AddToLeague() {
  const {
    network: { tables, useStore, walletClient, worldContract },
  } = useMUD();

  const [input, setInput] = useState("");

  const accounts = useStore((state) =>
    state.getRecords(tables.League_AccountInLeague)
  );

  return (
    <div>
      <div className="text-3xl">Add a player to the league</div>

      <form onSubmit={(e) => e.preventDefault()} className="Search__form">
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          type="text"
          placeholder="0x..."
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={Object.values(accounts).some(
            (record) => record.key.account === walletClient.account.address
          )}
          onClick={() =>
            worldContract.write.League_JoinSystem_addLeague([input as Hex])
          }
        >
          Add to league
        </button>
      </form>
    </div>
  );
}

export function App() {
  return (
    <div>
      <Stats />
      <AddToLeague />
    </div>
  );
}
