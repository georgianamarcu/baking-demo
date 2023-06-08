import {
  Billboard,
  Sky,
  Center,
  MeshTransmissionMaterial,
  Image,
  Environment,
  Lightformer,
  PerspectiveCamera,
  OrbitControls,
  Html,
} from "@react-three/drei";
import { Model } from "./Model";
import Effect from "./Effect";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";
import LampIcon from "./LampIcon";

function Scene(props) {
  const camera = useRef();
  return (
    <group position={props.position}>
      <Center>
        <Model scale={1} name="room" />

        <Html position={[-0.8, 0.9, 0]}>
          <div className="lamp-icon">
            <LampIcon />
          </div>
        </Html>
        <Effect />
      </Center>
      <Environment
        resolution={1024}
        files={"/kloofendal_43d_clear_1k.hdr"}
        background={false}
      />
      <Sky />
      <OrbitControls
        ref={camera}
        // enablePan={false}
        // onChange={() => {
        //   if (camera) {
        //     console.log(camera.current.object);
        //   }
        // }}
      />
    </group>
  );
}

export default Scene;
