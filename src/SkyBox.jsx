import { useTexture } from "@react-three/drei";
import { BackSide } from "three";

export default function SkyBox() {
  const texture = useTexture(
    "/cyberpunk_red_sky_background_at_sunset_with_the_su.jpeg"
  );

  return (
    <mesh userData={{ lensflare: "no-occlusion" }} scale={[-1, 1, 1]}>
      <sphereGeometry
        castShadow={false}
        receiveShadow={false}
        args={[50, 32, 32]}
      />
      <meshBasicMaterial toneMapped={false} map={texture} side={BackSide} />
    </mesh>
  );
}
