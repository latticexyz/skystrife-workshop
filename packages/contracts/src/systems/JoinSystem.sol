// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";

import { InLeague } from "../codegen/index.sol";

contract JoinSystem is System {
  function addLeague(address account) public {
    InLeague.set(account, true);
  }
}
