import "./App.css";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import { Loader, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Overlay from "./Overlay";
import { useRef } from "react";

function App() {
  const camera = useRef();
  return (
    <>
      <Canvas
        dpr={1.5}
        shadows
        camera={{
          fov: 45,
        }}
        // gl={{ alpha: false, stencil: false, antialias: false, depth: false }}
      >
        <Scene />
      </Canvas>
      <Loader />
      <Overlay />
    </>
  );
}

export default App;
