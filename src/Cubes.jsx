import React from "react";

function Cubes() {
  return (
    <>
      <mesh name="cube1" position={[-0.42, 0.8, -0.1]}>
        <boxGeometry args={[0.08, 0.08, 0.08]} />
        <meshBasicMaterial />
      </mesh>
      <mesh name="cube2" position={[-0.31, 0.8, -0.1]}>
        <boxGeometry args={[0.08, 0.08, 0.08]} />
        <meshBasicMaterial />
      </mesh>
      <mesh name="cube3" position={[-0.2, 0.8, -0.1]}>
        <boxGeometry args={[0.08, 0.08, 0.08]} />
        <meshBasicMaterial />
      </mesh>
      <mesh name="cube4" position={[-0.09, 0.8, -0.1]}>
        <boxGeometry args={[0.08, 0.08, 0.08]} />
        <meshBasicMaterial />
      </mesh>
    </>
  );
}

export default Cubes;
