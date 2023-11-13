# 1. Match rankings

**In this section, we will accomplish the following:**

1. Use a custom client to read the Sky Strife match rankings table.
2. Render player addresses as human readable names.

## 1.1. Read the table

To see the tables for Sky Strife we are going to navigate to the `mud.config.ts` file in the `skystrife-contracts` folder. All of the tables, their types, their schemas, and other types of information are defined here.

For the purposes of building a leaderboard, we need the `MatchRanking` table.

<CollapseCode>

```tsx filename="mud.config.ts" {5-7} copy showLineNumbers
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

```tsx filename="mud.config.ts" {6, 10-14} copy showLineNumbers
export function App() {
  const {
    network: { tables, useStore },
  } = useMUD();

  const rankings = useStore((state) => state.getRecords(tables.MatchRanking));

  return (
    <div>
      {Object.values(rankings).map((record) => (
        <div key={record.key.key}>
          Match #{record.key.key}: {record.value.value.join(", ")}
        </div>
      ))}
    </div>
  );
}
```

## 1.1. Read the table

These are unreadable. Let's create a `Player` component that displays a player name given an address.

```
function Player({ address }: { address: Hex }) {
  const {
    network: { tables, useStore },
  } = useMUD();

  const name = useStore((state) =>
    state.getValue(tables.Name, { key: address })
  );

  return <span>{name ? name.value : toEthAddress(address)}</span>;
}
```

And add this to the match ranking

```
export function App() {
  const {
    network: { tables, useStore },
  } = useMUD();

  const rankings = useStore((state) => state.getRecords(tables.MatchRanking));

  return (
    <div>
      {Object.values(rankings).map((record) => (
        <div key={record.key.key}>
          Match #{record.key.key}:{" "}
          {record.value.value.map((address) => (
            <div key={`${record.key.key}_${address}`}>
              <Player address={address} />,
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
```

Unfortunately the names don't work! Instead we do this and use OwnedBy.

```
export function App() {
  const {
    network: { tables, useStore },
  } = useMUD();

  const rankings = useStore((state) => {
    return Object.values(state.getRecords(tables.MatchRanking)).map(
      (record) => ({
        record,
        players: record.value.value.map((entity) => {
          const owner = state.getValue(tables.OwnedBy, {
            matchEntity: record.key.key,
            entity,
          });

          if (owner) {
            return owner.value;
          }

          return entity;
        }),
      })
    );
  });

  return (
    <div>
      <div>Rankings</div>
      {rankings.map(({ record, players }) => (
        <div key={record.key.key}>
          Match #{record.key.key}:
          {players.map((address) => (
            <div key={`${record.key.key}_${address}`}>
              <Player address={address} />,
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
```

The world will be big so we need to add sync filters
Go full in on the match rankings and the league shows only matches for those players
