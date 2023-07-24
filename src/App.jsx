import "./App.css";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import AnimatedCursor from "react-animated-cursor";
import { Suspense, useRef } from "react";
import { useAppStore } from "./store";
import Loader from "./Loader";

function App() {
  const color = useAppStore((state) => state.color);
  const started = useAppStore((state) => state.started);
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
        <Suspense fallback={null}>
          {started && <Scene position={[0.17, 0.56, 0.92]} />}
        </Suspense>
      </Canvas>
      <AnimatedCursor
        innerSize={10}
        outerSize={20}
        color={color}
        outerAlpha={0.2}
        innerScale={0.7}
        outerScale={2}
      />
      {/* <Overlay /> */}
      <Loader />
    </>
  );
}

export default App;
