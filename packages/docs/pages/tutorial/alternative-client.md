# 1. Match rankings

**In this section, we will accomplish the following:**

1. Use a custom client to read the Sky Strife match rankings table.
2. Render player addresses as human readable names.

## 1.1. Display match rankings

To see the tables for Sky Strife we are going to navigate to the `mud.config.ts` file in the `skystrife-contracts` folder. All of the tables, their types, their schemas, and other types of information are defined here.

For the purposes of building a leaderboard, we need the `MatchRanking` table.

<CollapseCode>

```ts filename="mud.config.ts" {5-7} copy showLineNumbers
import { mudConfig, resolveTableId } from "@latticexyz/world/register";

export default mudConfig({
  tables: {
    MatchRanking: {
      valueSchema: "bytes32[]",
    },
  },
});
```

This table tracks the ranking of players in a match. It is prepended to whenever a player's spawn is destroyed. The zeroth player in the array is 1st place.

On the client, we modify `App.tsx` to use Zustand`useStore` to retrieve the records and map over them.

```tsx filename="App.tsx" {8, 12-21} copy showLineNumbers
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
```

## 1.2. Displayplayer names

These are unreadable. Let's create a `Player` component that displays a player name given an address. We have to map over owners

```tsx filename="App.tsx" {4-14, 21-37, 44-48} copy showLineNumbers
import { useMUD } from "./MUDContext";
import { Hex } from "viem";

function Player({ address }: { address: Hex }) {
  const {
    network: { tables, useStore },
  } = useMUD();

  const name = useStore((state) =>
    state.getValue(tables.Name, { key: address })
  );

  return <span>{name ? name.value : address}</span>;
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
    </div>
  );
}
```

Now that we read the Sky Strife namespace, let's build our own!
