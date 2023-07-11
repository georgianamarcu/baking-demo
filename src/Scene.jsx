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
  CameraControls,
} from "@react-three/drei";
import { Model } from "./Model";
import Effect from "./Effect";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef, useState, useEffect } from "react";
import LampIcon from "./LampIcon";
import ImagesIcon from "./ImagesIcon";
import PaletteIcon from "./PaletteIcon";
import Cubes from "./Cubes";

function Scene(props) {
  const camera = useRef();
  const [maps, setMaps] = useState(true);
  const [changemap, setChangeMap] = useState(true);
  const { controls, scene } = useThree();

  return (
    <group position={props.position}>
      <Center>
        <Model scale={1} name="room" maps={maps} changemap={changemap} />
        <Effect />
      </Center>
      <Environment resolution={1024} files={"/kloofendal_43d_clear_1k.hdr"} />
      <Sky />
      <CameraControls
        verticalDragToForward={true}
        makeDefault
        minPolarAngle={1.15}
        maxPolarAngle={Math.PI / 2}
        minDistance={0.4}
        maxDistance={3}
        minAzimuthAngle={-1}
        maxAzimuthAngle={Math.PI / 10}
      />
    </group>
  );
}

export default Scene;
