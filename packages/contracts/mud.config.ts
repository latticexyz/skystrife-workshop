import { mudConfig } from "@latticexyz/world/register";

export default mudConfig({
  namespace: "MY_NAMESPACE",
  tables: {
    InLeague: {
      keySchema: {
        account: "address"
      },
      valueSchema: {
        isMember: "bool"
      }
    }
  },
});