import { mudConfig } from "@latticexyz/world/register";

export default mudConfig({
  namespace: "League",
  tables: {
    InLeague: {
      keySchema: { account: "address", },
      valueSchema: { inLeague: "bool" }
    },
  }
})