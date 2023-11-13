import { mudConfig } from "@latticexyz/world/register";

export default mudConfig({
  namespace: "League1",
  tables: {
    AccountInLeague: {
      keySchema: { account: "address" },
      valueSchema: { inLeague: "bool" },
    },
    Organiser: {
      keySchema: {
        account: "address",
      },
      valueSchema: { value: "bool" },
    },
  },
});
