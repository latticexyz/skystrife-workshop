# 1. Match rankings

**In this section, we will accomplish the following:**

1. Create our own namespace on an existing Sky Strife world with a `InLeague` table.
2. Use a system to allow players to join the leauge
3. Allow using the system on the client

## 1.1. Creating the table

In the `contracts` folder there is a `mud.config.ts` file.

<CollapseCode>

```tsx filename="mud.config.ts" {5-8} copy showLineNumbers
import { mudConfig } from "@latticexyz/world/register";

export default mudConfig({
  tables: {
    InLeague: {
      keySchema: { account: "address" },
      valueSchema: { inLeague: "bool" },
    },
  },
});
```

</CollapseCode>

## 1.2. Create the system

Let's customise ` JoinSystem.sol` in `src/systems`. We add `joinLeague` method, which will assign the `InLeague`, tables to the given address.

<CollapseCode>

```tsx filename="mud.config.ts" {5, 8-10} copy showLineNumbers
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";
import { InLeague } from "../codegen/index.sol";

contract JoinSystem is System {
  function joinLeague(address account) public {
    InLeague.set(account, true);
  }
}
```

</CollapseCode>
