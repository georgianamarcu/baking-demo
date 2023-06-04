import React, { useRef, useLayoutEffect } from "react";
import { useGLTF, useTexture, useAnimations, useKTX2 } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
  SRGBColorSpace,
  LinearSRGBColorSpace,
  RepeatWrapping,
  MeshStandardMaterial,
  Color,
} from "three";

export function Model(props) {
  const walls = useRef();
  const cabinet = useRef();
  const cushion = useRef();
  const floor = useRef();
  const { nodes, materials, animations } = useGLTF("/room.glb");
  const fixAlbedo = (texture, repeat) => {
    texture.flipY = false;
    texture.repeat.set(repeat, repeat);
    texture.colorSpace = SRGBColorSpace;
    texture.wrapS = texture.wrapT = RepeatWrapping;
  };
  const fixBaked = (textures) => {
    textures.map((texture) => {
      texture.flipY = false;
      texture.colorSpace = SRGBColorSpace;
    });
  };
  const fixBake = (texture) => {
    texture.flipY = false;
    texture.colorSpace = SRGBColorSpace;
  };
  const [floorAlbedo, cushionAlbedo, pillow1Albedo, pillow2Albedo, floorAO] =
    useTexture([
      "/albedos/TWF-0039 Diffuse 4K.jpg",
      "/albedos/SofaFabricJulia_diffuse.jpg",
      "/albedos/Fabric7_diffuse.jpg",
      "/albedos/Fabric_Glossiness.jpg",
      "/bakes/Floor_ao_PBR_Ambient Occlusion.jpg",
    ]);
  const bakedTextures = useKTX2([
    "/bakes/Room_ao_PBR_Ambient Occlusion.ktx2",
    "/bakes/Room_walls_PBR_Lightmap.ktx2",
    "/bakes/Wall Cabinet_ao_PBR_Ambient Occlusion.ktx2",
    "/bakes/WindowCusion_ao_PBR_Ambient Occlusion.ktx2",
    "/bakes/WindowCusion.001_cushion_PBR_Lightmap.ktx2",
    "/bakes/Floor_LighMap_PBR_Lightmap.ktx2",
    "/bakes/Wall Cabinet_LighMap_PBR_Lightmap.ktx2",
  ]);
  fixAlbedo(floorAlbedo, 1);
  fixAlbedo(cushionAlbedo, 10);
  fixAlbedo(pillow1Albedo, 1);
  fixAlbedo(pillow2Albedo, 4);
  fixBake(floorAO);
  fixBaked(bakedTextures);
  const [
    wallsAO,
    wallsLM,
    cabinetAO,
    cushionAO,
    cushionLM,
    floorLM,
    cabinetLM,
  ] = bakedTextures ?? null;
  useLayoutEffect(() => {
    walls.current.geometry.attributes.uv2 =
      walls.current.geometry.attributes.uv;
    cabinet.current.geometry.attributes.uv2 =
      cabinet.current.geometry.attributes.uv;
    cushion.current.geometry.attributes.uv2 =
      cushion.current.geometry.attributes.uv;
    floor.current.geometry.attributes.uv2 =
      floor.current.geometry.attributes.uv;
  }, []);
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Baseboard.geometry}
        material={materials["Baseboard_material.001"]}
        position={[-1.496321, 0, 0.207386]}
        scale={[1, 1, 0.821515]}
      />
      <mesh
        ref={floor}
        geometry={nodes.Floor.geometry}
        position={[0, 0, 1.184006]}
        scale={1.494426}
      >
        <meshStandardMaterial
          map={floorAlbedo}
          aoMap={floorAO}
          aoMapIntensity={0.7}
          envMapIntensity={1.1}
          lightMap={floorLM}
          lightMapIntensity={1.5}
        />
      </mesh>
      <mesh
        geometry={nodes.ceiling.geometry}
        position={[0, 2.786496, 1.184006]}
        scale={1.494426}
      >
        <meshBasicMaterial color="white" />
      </mesh>
      <mesh
        ref={cushion}
        geometry={nodes.WindowCusion.geometry}
        position={[-0.000338, 0.614499, -0.026264]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.852323, 0.740355, 0.852323]}
      >
        <meshStandardMaterial
          map={cushionAlbedo}
          aoMap={cushionAO}
          aoMapIntensity={0.6}
          // lightMap={cushionLM}
          // lightMapIntensity={2}
        />
      </mesh>
      <group
        position={[-0.000338, 0.614499, -0.026264]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.852323, 0.740355, 0.852323]}
      >
        <mesh
          geometry={nodes.WindowCusion001.geometry}
          position={[-0.01093, 0.047011, 0.003893]}
          scale={[1, 1.151235, 1]}
        >
          <meshStandardMaterial map={pillow2Albedo} />
        </mesh>
        <mesh
          geometry={nodes.WindowCusion002.geometry}
          position={[0, 0.051432, 0.003893]}
          scale={[1, 1.151235, 1]}
        >
          <meshStandardMaterial map={pillow1Albedo} />
        </mesh>
      </group>
      <mesh
        ref={walls}
        geometry={nodes.Room.geometry}
        position={[-1.492754, 0, -0.318267]}
      >
        <meshStandardMaterial
          aoMap={wallsAO}
          aoMapIntensity={0.5}
          lightMap={wallsLM}
          lightMapIntensity={1.5}
          envMapIntensity={0.9}
          color={"#B6C2B8"}
        />
      </mesh>

      <group position={[0.015524, 0.63437, -0.330901]} scale={1.530393}>
        <mesh
          geometry={nodes.Plane.geometry}
          material={materials["iMeshh Window"]}
        />
        <mesh
          geometry={nodes.Plane_1.geometry}
          material={materials["window secruity red.001"]}
        />
        <mesh geometry={nodes.Plane_2.geometry} material={materials.string} />
        <mesh
          geometry={nodes.Plane_3.geometry}
          material={materials["iMeshh Trim"]}
        />
      </group>
      {/* <mesh
        geometry={nodes["Window-4001"].geometry}
        material={materials.glass}
        position={[0.015524, 0.63437, -0.330901]}
        scale={1.530393}
      /> */}
      <mesh
        ref={cabinet}
        geometry={nodes.Wall_Cabinet.geometry}
        position={[-1.495224, 0.596676, 1.1378]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <meshStandardMaterial
          aoMap={cabinetAO}
          aoMapIntensity={0.75}
          envMapIntensity={1}
          roughness={0.5}
          lightMap={cabinetLM}
          lightMapIntensity={1.4}
        />
      </mesh>
      <group
        position={[-1.495224, 0.596676, 1.1378]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <group
          position={[-0.435478, 0.256874, 0.185481]}
          rotation={[0, Math.PI / 2, 0]}
          scale={0.850309}
        >
          <mesh
            geometry={nodes.Cube002.geometry}
            material={materials["Metal Simple Marked.001"]}
          />
          <mesh
            geometry={nodes.Cube002_1.geometry}
            material={materials.Marble}
          />
          <mesh
            geometry={nodes.Cube002_2.geometry}
            material={materials.wire_006134006}
          />
        </group>
        <mesh
          geometry={nodes.Cylinder002.geometry}
          material={materials["Concrete.001"]}
          position={[0.474882, 0.190962, 0.256317]}
          rotation={[-Math.PI, 1.386892, -Math.PI]}
          scale={0.810291}
        />
        <group
          position={[0.185999, 0.367067, 0.015319]}
          rotation={[1.519711, 0, 0]}
          scale={0.163449}
        >
          <mesh
            geometry={nodes.iMeshh_Frame_Set008.geometry}
            material={materials["Black painted Wood"]}
          />
          <mesh
            geometry={nodes.iMeshh_Frame_Set008_1.geometry}
            material={materials.floor}
          />
          <mesh
            geometry={nodes.iMeshh_Frame_Set008_2.geometry}
            material={materials["Picture.012"]}
          />
          <mesh geometry={nodes.iMeshh_Frame_Set008_3.geometry}>
            <meshStandardMaterial
              transparent={true}
              opacity={0.2}
              roughness={0.1}
            />
          </mesh>
        </group>
        <group
          position={[-0.159329, 0.204049, 0.247198]}
          rotation={[1.571228, 0.001684, -1.819167]}
          scale={[1.185288, 1.185288, 1.402642]}
        >
          <mesh
            geometry={nodes.Plane021.geometry}
            material={materials["Magazine Cover1.025"]}
          />
          <mesh
            geometry={nodes.Plane021_1.geometry}
            material={materials["Magazine Edge.016"]}
          />
        </group>
        <group
          position={[-0.161067, 0.210933, 0.247253]}
          rotation={[Math.PI / 2, 0, -1.788927]}
          scale={[1.111103, 1.111103, 1.640584]}
        >
          <mesh
            geometry={nodes.Plane004.geometry}
            material={materials["Magazine Cover1.026"]}
          />
          <mesh
            geometry={nodes.Plane004_1.geometry}
            material={materials["Magazine Edge.016"]}
          />
        </group>
        <group
          position={[-0.151329, 0.238636, 0.242613]}
          rotation={[Math.PI / 2, 0, -1.800264]}
          scale={[1.185288, 1.185288, 1.402642]}
        >
          <mesh
            geometry={nodes.Plane023.geometry}
            material={materials["Magazine Cover1.027"]}
          />
          <mesh
            geometry={nodes.Plane023_1.geometry}
            material={materials["Magazine Edge.016"]}
          />
        </group>
        <group
          position={[-0.151316, 0.232763, 0.242202]}
          rotation={[Math.PI / 2, 0, -1.926095]}
          scale={[1.04896, 1.04896, 1.743117]}
        >
          <mesh
            geometry={nodes.Plane024.geometry}
            material={materials["Magazine Cover1.028"]}
          />
          <mesh
            geometry={nodes.Plane024_1.geometry}
            material={materials["Magazine Edge.016"]}
          />
        </group>
        <group
          position={[-0.168044, 0.258401, 0.263961]}
          rotation={[Math.PI / 2, 0, -1.596435]}
          scale={[1.185288, 1.185288, 1.505333]}
        >
          <mesh
            geometry={nodes.Plane025.geometry}
            material={materials["Magazine Cover1.029"]}
          />
          <mesh
            geometry={nodes.Plane025_1.geometry}
            material={materials["Magazine Edge.016"]}
          />
        </group>
        <group
          position={[-0.161067, 0.242056, 0.247253]}
          rotation={[Math.PI / 2, 0, -1.788927]}
          scale={[1.111103, 1.111103, 1.640584]}
        >
          <mesh
            geometry={nodes.Plane022.geometry}
            material={materials["Magazine Cover1.026"]}
          />
          <mesh
            geometry={nodes.Plane022_1.geometry}
            material={materials["Magazine Edge.016"]}
          />
        </group>
        <group
          position={[0.47445, 0.237662, 0.266582]}
          rotation={[-Math.PI, 1.386892, -Math.PI]}
          scale={0.01342}
        >
          <mesh
            geometry={nodes.Palm1001_1.geometry}
            material={materials["iMeshh Aloe"]}
          />
          <mesh
            geometry={nodes.Palm1001_2.geometry}
            material={materials["Grass Material.001"]}
          />
        </group>
        <group
          position={[-0.066054, 0.192568, 0.113895]}
          rotation={[-Math.PI, 1.338744, -Math.PI]}
          scale={0.61129}
        >
          <mesh
            geometry={nodes.Sphere_1.geometry}
            material={materials["Plain Wall Panel"]}
          />
          <mesh
            geometry={nodes.Sphere_2.geometry}
            material={materials["Candle Thin"]}
          />
          <mesh
            geometry={nodes.Sphere_3.geometry}
            material={materials["Wick.002"]}
          />
          <mesh
            geometry={nodes.Sphere_4.geometry}
            material={materials["Candle Light 1.002"]}
          />
        </group>
        <group
          position={[-0.143858, 0.192568, 0.132281]}
          rotation={[-Math.PI, 1.338744, -Math.PI]}
          scale={0.61129}
        >
          <mesh
            geometry={nodes.Sphere_1.geometry}
            material={materials["Plain Wall Panel"]}
          />
          <mesh
            geometry={nodes.Sphere_2.geometry}
            material={materials["Candle Thin"]}
          />
          <mesh
            geometry={nodes.Sphere_3.geometry}
            material={materials["Wick.002"]}
          />
          <mesh
            geometry={nodes.Sphere_4.geometry}
            material={materials["Candle Light 1.002"]}
          />
        </group>
      </group>
      <group position={[-1.102069, 1.977591, 0.190852]}>
        <mesh
          geometry={nodes.Decoration_Clock_Black_White_01_1.geometry}
          material={materials.Plastic_Universal_Black}
        />
        <mesh
          geometry={nodes.Decoration_Clock_Black_White_01_2.geometry}
          material={materials.floor}
        />
        <mesh
          geometry={nodes.Decoration_Clock_Black_White_01_3.geometry}
          material={materials["iMeshh Wood0129 Black"]}
        />
        <mesh geometry={nodes.Decoration_Clock_Black_White_01_4.geometry}>
          <meshStandardMaterial
            transparent={true}
            opacity={0.2}
            roughness={0.1}
          />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload("/room.glb");
