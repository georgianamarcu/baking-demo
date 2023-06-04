import {
  Billboard,
  Sky,
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
  useFrame((state) => {
    state.camera.position.lerp(
      { x: state.pointer.x / 2, y: -state.pointer.y / 2, z: 1.6 },
      0.1
    );
    state.camera.lookAt(-0.7, -0.4, 0);
  });

  return (
    <>
      <Center>
        <Model scale={1} name="room" />
        <Effect />
      </Center>
      <Environment resolution={512} files={"/empty_warehouse_01_1k.hdr"} />
    </>
  );
}

export default Scene;
