import { toEthAddress } from "@latticexyz/utils";
import { useMUD } from "./MUDContext";
import { Hex } from "viem";
import { useEffect, useState } from "react";
import mudConfig from "contracts-skystrife/mud.config";

function DevTools() {
  const { network } = useMUD();

  useEffect(() => {
    import("@latticexyz/dev-tools").then(({ mount: mountDevTools }) =>
      mountDevTools({
        config: mudConfig,
        publicClient: network.publicClient,
        walletClient: network.walletClient,
        latestBlock$: network.latestBlock$,
        storedBlockLogs$: network.storedBlockLogs$,
        worldAddress: network.worldContract.address,
        worldAbi: network.worldContract.abi,
        write$: network.write$,
      })
    );
  }, []);

  return <></>;
}

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
          } else {
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
            ? counts.map(([key, { won, lost }]) => {
                const ratio = won / (won + lost);
                return (
                  <tr key={key}>
                    <td>
                      <Player address={key as Hex} />
                    </td>
                    <td>{ratio.toString()}</td>
                    <td>{won}</td>
                    <td>{lost}</td>
                  </tr>
                );
              })
            : "No ranking yet"}
        </tbody>
      </table>
    </div>
  );
}

function Admin() {
  const {
    network: { tables, useStore },
  } = useMUD();

  const admin = useStore((state) => state.getValue(tables.League_Admin, {}));

  return (
    <div>
      <div className="text-3xl">Admin</div>
      <div>{admin ? admin.account : null}</div>
    </div>
  );
}

function AddToLeague() {
  const {
    network: { tables, useStore, walletClient, worldContract },
  } = useMUD();

  const [address, setAddress] = useState("");

  const accounts = useStore((state) =>
    state.getRecords(tables.League_AccountInLeague)
  );

  return (
    <div>
      <div className="text-3xl">Add a player to the league</div>

      <form onSubmit={(e) => e.preventDefault()} className="Search__form">
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          type="text"
          placeholder="0x..."
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={Object.values(accounts).some(
            (record) => record.key.account === walletClient.account.address
          )}
          onClick={() =>
            worldContract.write.League_JoinSystem_addLeague([address as Hex])
          }
        >
          Add to league
        </button>
      </form>
    </div>
  );
}

export function App() {
  const {
    network: { useStore },
  } = useMUD();

  const syncProgress = useStore((state) => state.syncProgress);

  console.log(syncProgress);

  return (
    <>
      {syncProgress.percentage === 100 ? (
        <div>
          <Stats />
          <AddToLeague />
          <Admin />

          <DevTools />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-around h-screen">
          <div>
            <div className="text-3xl">
              Syncing Sky Strife World:{" "}
              <span className="text-blue-400">{syncProgress.percentage}%</span>
            </div>
            <div className="text-2xl">{syncProgress.message}</div>
          </div>
        </div>
      )}
    </>
  );
}
