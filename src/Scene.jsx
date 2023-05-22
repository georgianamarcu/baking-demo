import {
  Billboard,
  Bvh,
  Center,
  MeshTransmissionMaterial,
  Text,
  Text3D,
  Environment,
  Lightformer,
  PerspectiveCamera,
} from "@react-three/drei";
import SkyBox from "./SkyBox";
import { Model } from "./Model";
import Effect from "./Effect";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Scene() {
  return (
    <>
      <Center>
        <Model
          scale={3}
          position={[-3.09, -3.93, -3.71]}
          rotation={[0, -2.51, 0]}
          name="car"
        />
        <Effect />
        <Environment resolution={512} files={"/studio_small_03_1k.hdr"} />
        <SkyBox />
      </Center>
    </>
  );
}

export default Scene;
