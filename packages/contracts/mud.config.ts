import { mudConfig } from "@latticexyz/world/register";

export default mudConfig({
  namespace: "League",
  tables: {
    AccountInLeague: {
      keySchema: { account: "address", },
      valueSchema: { inLeague: "bool" }
    },
    Admin: {
      keySchema: {},
      valueSchema: { account: "address" }
    },
  }
})