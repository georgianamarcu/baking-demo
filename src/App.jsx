import "./App.css";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import { Loader, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Overlay from "./Overlay";
import AnimatedCursor from "react-animated-cursor";
import { useRef } from "react";
import { useAppStore } from "./store";

function App() {
  const camera = useRef();
  const color = useAppStore((state) => state.color);
  return (
    <>
      <Canvas
        dpr={[1, 2]}
        shadows
        gl={{ antialias: false }}
        camera={{
          fov: 35,
          near: 0.1,
          position: [
            -1.6032762282963646, 0.5173265050059029, 1.5899206651816116,
          ],
          rotation: [
            -0.31457448785527486, -0.7644284435782136, -0.22150734322292498,
          ],
        }}
      >
        <Scene position={[0.17, 0.56, 0.92]} />
      </Canvas>
      <AnimatedCursor
        innerSize={10}
        outerSize={20}
        color={color}
        outerAlpha={0.2}
        innerScale={0.7}
        outerScale={2}
      />
      <Loader />
      {/* <Overlay /> */}
    </>
  );
}

export default App;
