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
import { useRef, useState } from "react";
import LampIcon from "./LampIcon";
import ImagesIcon from "./ImagesIcon";

function Scene(props) {
  const camera = useRef();
  const [maps, setMaps] = useState(true);
  const [changemap, setChangeMap] = useState(true);
  return (
    <group position={props.position}>
      <Center>
        <Model scale={1} name="room" maps={maps} changemap={changemap} />
        <Html position={[-0.8, 0.9, 0]}>
          <div className="icons">
            <div className="lamp-icon" onClick={() => setMaps(!maps)}>
              <LampIcon />
            </div>
            <div className="lamp-icon" onClick={() => setChangeMap(!changemap)}>
              <ImagesIcon />
            </div>
          </div>
        </Html>
        <Effect />
      </Center>
      <Environment resolution={1024} files={"/kloofendal_43d_clear_1k.hdr"} />
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
