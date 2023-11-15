// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";
import { InLeague } from "../codegen/index.sol";
import { Name } from "contracts-skystrife/src/codegen/index.sol";

function addressToEntity(address account) pure returns (bytes32) {
  return bytes32(uint256(uint160((account))));
}

contract LeagueManagementSystem is System {
  function addLeagueMember(address account) public {
    string memory name = Name.get(addressToEntity(account));
    require(bytes(name).length > 0, "account does not have a name");

    InLeague.set(account, true);
  }
}
