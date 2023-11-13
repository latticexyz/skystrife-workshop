import { SyncStep } from "@latticexyz/store-sync";
import { useMUD } from "./MUDContext";
import { AccountDetails } from "./AccountDetails";
import { Dashboard } from "./Dashboard";

export function App() {
  const {
    network: { useStore },
  } = useMUD();

  const syncProgress = useStore((state) => state.syncProgress);

  return (
    <>
      {syncProgress.step === SyncStep.LIVE ? (
        <div>
          <div className="flex flex-col h-screen justify-between">
            <div>
              <Dashboard />
            </div>
            <div>
              <AccountDetails />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-around h-screen">
          <div>
            <div className="text-3xl">
              Syncing Sky Strife World:{" "}
              <span className="text-blue-400">{syncProgress.percentage}%</span>
            </div>
            <div className="text-2xl">{syncProgress.message}</div>
          </div>
        </div>
      )}
    </>
  );
}
