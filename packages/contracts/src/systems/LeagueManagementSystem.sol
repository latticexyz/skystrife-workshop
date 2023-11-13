// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";

import { AccountInLeague, Organiser } from "../codegen/index.sol";

contract LeagueManagementSystem is System {
  function addLeagueMember(address account) onlyOrganiser public {
    AccountInLeague.set(account, true);
  }

  function removeLeagueMember(address account) onlyOrganiser public {
    AccountInLeague.set(account, false);
  }

  modifier onlyOrganiser() {
    require(Organiser.get(_msgSender()), "caller is not in league");
    _;
  }
}
