import { Leaderboard } from "./Leaderboard";
import { League } from "./League";

export function Dashboard() {
  return (
    <div className="m-2">
      <div className="text-3xl">Sky Strife dashboard</div>
      <Leaderboard />
      <League />
    </div>
  );
}
