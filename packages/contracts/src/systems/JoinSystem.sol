// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";

import { AccountInLeague, Admin } from "../codegen/index.sol";

contract JoinSystem is System {
  function addLeague(address account) public {
    require(Admin.get() == _msgSender(), "caller is not admin");
    AccountInLeague.set(account, true);
  }
}
