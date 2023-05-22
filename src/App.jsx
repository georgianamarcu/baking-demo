import "./App.css";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

function App() {
  return (
    <>
      <Canvas
        dpr={1}
        shadows
        camera={{ fov: 85, near: 0.1, far: 1000, position: [3, 0, 5] }}
        gl={{ alpha: false, stencil: false, antialias: false, depth: false }}
      >
        <Scene />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={0}
          maxPolarAngle={Math.PI * 0.5}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI * 0.5}
        />
      </Canvas>
    </>
  );
}

export default App;
