# 1. Match rankings

**In this section, we will accomplish the following:**

1. Create our own namespace on an existing Sky Strife world with a `InLeague` table.
2. Use a system to allow players to join the leauge
3. Allow using the system on the client

## 1.1. Creating the table

In the `contracts` folder there is a `mud.config.ts` file.

<CollapseCode>

```tsx filename="mud.config.ts" {8-16} copy showLineNumbers
import { mudConfig } from "@latticexyz/world/register";

export default mudConfig({
  enums: {
    // TODO
  },
  tables: {
    Movable: "bool",
    Player: "bool",
    Position: {
      dataStruct: false,
      valueSchema: {
        x: "uint32",
        y: "uint32",
      },
    },
  },
});
```

</CollapseCode>
