import { useState } from "react";
import { PromiseButton } from "./PromiseButton";
import { Hex } from "viem";
import { useMUD } from "./MUDContext";

export function League() {
  const {
    network: { worldContract },
  } = useMUD();

  const [address, setAddress] = useState("");

  return (
    <div className="w-96 p-4 m-1 mt-8 border-2">
      <div className="text-2xl">Add a player to the league</div>

      <form onSubmit={(e) => e.preventDefault()}>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          type="text"
          placeholder="0x..."
        />
        <PromiseButton
          promise={() =>
            worldContract.write.MY_NAMESPACE_LeagueManagement_addLeagueMember([
              address as Hex,
            ])
          }
        >
          Add
        </PromiseButton>
      </form>
    </div>
  );
}
