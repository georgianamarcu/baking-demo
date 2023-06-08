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
        dpr={[1, 2]}
        shadows
        gl={{ antialias: false }}
        camera={{
          fov: 40,
          near: 0.1,
          position: [
            -1.8164859794614057, 0.0038961914109026364, 1.4374743840103745,
          ],
          rotation: [
            -0.002710435683351626, -0.9013508954177016, -0.0021254333081949864,
          ],
        }}
      >
        <Scene position={[0.17, 0.42, 0.92]} />
      </Canvas>
      <Loader />
      {/* <Overlay /> */}
    </>
  );
}

export default App;
