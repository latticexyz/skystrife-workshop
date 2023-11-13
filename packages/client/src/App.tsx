import { useState } from "react";
import { useMUD } from "./MUDContext";
import { Hex } from "viem";
import { encodeEntity } from "@latticexyz/store-sync/recs";

function Player({ address }: { address: Hex }) {
  const {
    network: { tables, useStore },
  } = useMUD();

  const name = useStore((state) =>
    state.getValue(tables.Name, { key: address })
  );

  return <span>{name ? name.value : address}</span>;
}

function League() {
  const {
    network: { tables, useStore, worldContract },
  } = useMUD();

  const [address, setAddress] = useState("");

  const accounts = useStore((state) =>
    state.getRecords(tables.League_InLeague)
  );

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          type="text"
          placeholder="0x..."
        />
        <button
          onClick={() =>
            worldContract.write.League_JoinSystem_addLeague([address as Hex])
          }
        >
          Add to league
        </button>
      </form>

      {Object.values(accounts).map((record) =>
        record.value.inLeague ? (
          <div key={record.key.account}>
            <Player
              address={encodeEntity(
                { address: "address" },
                { address: record.key.account }
              )}
            />
          </div>
        ) : null
      )}
    </div>
  );
}

export function App() {
  const {
    network: { tables, useStore },
  } = useMUD();

  const rankings = useStore((state) => {
    return Object.values(state.getRecords(tables.MatchRanking)).map(
      (record) => ({
        matchEntity: record.key.key,
        players: record.value.value.map((entity) => {
          const owner = state.getValue(tables.OwnedBy, {
            matchEntity: record.key.key,
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
      {rankings.map(({ matchEntity, players }) => (
        <div key={matchEntity}>
          Match #{matchEntity}:
          {players.map((address, i) => (
            <div key={`${matchEntity}_${address}`}>
              {i + 1}: <Player address={address} />
            </div>
          ))}
        </div>
      ))}
      <League />
    </div>
  );
}
