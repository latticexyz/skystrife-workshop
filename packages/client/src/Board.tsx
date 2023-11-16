import { Edges, OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import { ThreeElements } from "@react-three/fiber";
import { MATCH_ID } from "./Dashboard";
import { templateToColor } from "./utils/templateToColor";
import { useTerrain } from "./utils/useTerrain";
import { useUnits } from "./utils/useUnits";
import { useMappings } from "./utils/useMappings";

function Box(props: ThreeElements["mesh"] & { color: string; height: number }) {
  const { color, height } = props;

  const ref = useRef<THREE.Mesh>(null);

  return (
    <mesh {...props} ref={ref}>
      <boxGeometry args={[1, height, 1]} />
      <meshStandardMaterial color={color} />
      <Edges scale={1} color={"black"} />
    </mesh>
  );
}

export function Board() {
  const { StructureTypesToTexture, UnitTypesToTexture } = useMappings();

  const terrain = useTerrain(MATCH_ID);
  const units = useUnits(MATCH_ID);

  return (
    <>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />
      {units.map(({ position, structureType, unitType }, i) => (
        <sprite key={i} position={[position.x, 0.5, position.y]}>
          <spriteMaterial
            map={
              unitType
                ? UnitTypesToTexture[unitType.value]
                : StructureTypesToTexture[structureType.value]
            }
          />
        </sprite>
      ))}
      {terrain.map(({ templateId, position }, i) => (
        <Box
          key={i}
          color={templateToColor(templateId)}
          position={[position.x, -0.5, position.y]}
          height={1}
        />
      ))}
    </>
  );
}
