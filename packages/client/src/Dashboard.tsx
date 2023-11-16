import { Canvas } from "@react-three/fiber";
import {
  VRButton,
  XR,
  Controllers,
  Hands,
  TeleportationPlane,
} from "@react-three/xr";
import { Board } from "./Board";
import { Hex } from "viem";

export const MATCH_ID: Hex =
  "0x21dac15900000000000000000000000000000000000000000000000000000000";

export const Dashboard = () => {
  return (
    <div className="h-screen">
      <VRButton />
      <Canvas camera={{ position: [0, 0, 3] }}>
        <color attach="background" args={["#87ceeb"]} />
        <XR>
          <Controllers />
          <Hands />
          <TeleportationPlane rightHand={true} />
          <Board />
        </XR>
      </Canvas>
    </div>
  );
};
