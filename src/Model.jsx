import React, { useRef, useLayoutEffect, useEffect } from "react";
import { useGLTF, useTexture, useKTX2 } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import {
  SRGBColorSpace,
  LinearSRGBColorSpace,
  RepeatWrapping,
  Color,
} from "three";
import { gsap } from "gsap";
import { useGesture } from "react-use-gesture";
import * as THREE from "three";
import { useAppStore } from "./store";

export function Model(props) {
  const { nodes, materials } = useGLTF("/bakingDemo-v1.glb");
  const update = useAppStore((state) => state.update);
  const currentTexture = useAppStore((state) => state.currentTexture);

  const fixAlbedo = (texture, repeat) => {
    texture.flipY = false;
    texture.repeat.set(repeat, repeat);
    texture.colorSpace = SRGBColorSpace;
    texture.wrapS = texture.wrapT = RepeatWrapping;
  };

  const fixAlbedos = (textures, repeat) => {
    textures.map((texture) => {
      texture.flipY = false;
      texture.repeat.set(repeat, repeat);
      texture.colorSpace = SRGBColorSpace;
      texture.wrapS = texture.wrapT = RepeatWrapping;
    });
  };
  const fixBaked = (textures) => {
    textures.map((texture) => {
      texture.flipY = false;
      texture.colorSpace = SRGBColorSpace;
    });
  };

  const fixNormalTexture = (texture, repeat) => {
    texture.flipY = false;
    texture.colorSpace = LinearSRGBColorSpace;
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.repeat.set(repeat, repeat);
  };

  const bakedTextures = {
    plintAO: "/baked/Baseboard_AO_PBR_Ambient Occlusion.ktx2",
    ceilingAO: "/baked/Ceiling_AO_PBR_Ambient Occlusion.ktx2",
    deskAO: "/baked/Desk.001_AO_PBR_Ambient Occlusion.ktx2",
    floorAO: "/baked/Floor_AO_PBR_Ambient Occlusion.ktx2",
    drawersAO: "/baked/Roundcube.001_AO_PBR_Ambient Occlusion.ktx2",
    chairAO: "/baked/Tulip Chair Top_AO_PBR_Ambient Occlusion.ktx2",
    roomAO: "/baked/Room_AO_PBR_Ambient Occlusion.ktx2",
    plintLM: "/baked/Baseboard_LighMap2_PBR_Lightmap.ktx2",
    deskLM: "/baked/Desk.001_LighMap2_PBR_Lightmap.ktx2",
    floorLM: "/baked/Floor_LighMap2_PBR_Lightmap.ktx2",
    roomLM: "/baked/Room_LighMap2_PBR_Lightmap.ktx2",
    drawersLM: "/baked/Roundcube.001_LighMap2_PBR_Lightmap.ktx2",
    chairLM: "/baked/Tulip Chair Top_LighMap2_PBR_Lightmap.ktx2",
  };
  const albedos = {
    lampAlbedo: "/textures/Plane.012_metal_PBR_Diffuse.ktx2",
    floorAlbedo: "/textures/TWF-0022 Diffuse 4K.ktx2",
    chairAlbedo: "/textures/Fabric036_4K_Color.ktx2",
  };

  const deskWood = {
    robiniaBranson:
      "/textures/wood/Wood_Robinia_Branson_Truffle_Diffuse_2k.webp",
    oak1: "/textures/wood/Wood_Maple_Mandal_Natural_Diffuse_2k.webp",
    oak2: "/textures/wood/Wood_Oak_Vicenza_Grey_Diffuse_2k.webp",
    walnut: "/textures/wood/Wood_Walnut_Carini_Natural_Diffuse_2k.webp",
  };
  const normals = {
    lampNormals: "/textures/Plane.012_metal_PBR_Normal.ktx2",
  };
  const roughness = {
    lampRoughness: "/textures/Plane.012_metal_PBR_Roughness.ktx2",
  };

  const [
    plintAO,
    ceilingAO,
    deskAO,
    floorAO,
    drawersAO,
    chairAO,
    roomAO,
    lampAlbedo,
    lampNormals,
    lampRoughness,
    floorAlbedo,
    chairAlbedo,
    plintLM,
    deskLM,
    floorLM,
    roomLM,
    drawersLM,
    chairLM,
  ] = useKTX2([
    bakedTextures.plintAO,
    bakedTextures.ceilingAO,
    bakedTextures.deskAO,
    bakedTextures.floorAO,
    bakedTextures.drawersAO,
    bakedTextures.chairAO,
    bakedTextures.roomAO,
    albedos.lampAlbedo,
    normals.lampNormals,
    roughness.lampRoughness,
    albedos.floorAlbedo,
    albedos.chairAlbedo,
    bakedTextures.plintLM,
    bakedTextures.deskLM,
    bakedTextures.floorLM,
    bakedTextures.roomLM,
    bakedTextures.drawersLM,
    bakedTextures.chairLM,
  ]);
  const [robiniaBranson, oak1, oak2, walnut] = useTexture([
    deskWood.robiniaBranson,
    deskWood.oak1,
    deskWood.oak2,
    deskWood.walnut,
  ]);

  const [robiniaBransonClone, oak1Clone, oak2Clone, walnutClone] = [
    robiniaBranson,
    oak1,
    oak2,
    walnut,
  ].map((texture) => texture.clone());

  fixAlbedos([robiniaBranson, oak1, oak2, walnut], 2);
  fixAlbedos([robiniaBransonClone, oak1Clone, oak2Clone, walnutClone], 0.4);

  fixBaked([
    plintAO,
    ceilingAO,
    deskAO,
    floorAO,
    drawersAO,
    chairAO,
    roomAO,
    plintLM,
    deskLM,
    floorLM,
    roomLM,
    drawersLM,
    chairLM,
  ]);
  fixAlbedo(lampAlbedo, 4);
  fixAlbedo(chairAlbedo, 4);
  fixAlbedo(lampRoughness, 4);
  fixAlbedo(floorAlbedo, 1);
  fixNormalTexture(lampNormals, 4);

  const plintRef = useRef();
  const ceilingRef = useRef();
  const deskRef = useRef();
  const floorRef = useRef();
  const drawersRef = useRef();
  const chairRef = useRef();
  const roomRef = useRef();

  useLayoutEffect(() => {
    plintRef.current.geometry.attributes.uv2 =
      plintRef.current.geometry.attributes.uv;
    ceilingRef.current.geometry.attributes.uv2 =
      ceilingRef.current.geometry.attributes.uv;
    deskRef.current.geometry.attributes.uv2 =
      deskRef.current.geometry.attributes.uv;
    floorRef.current.geometry.attributes.uv2 =
      floorRef.current.geometry.attributes.uv;
    drawersRef.current.geometry.attributes.uv2 =
      drawersRef.current.geometry.attributes.uv;
    chairRef.current.geometry.attributes.uv2 =
      chairRef.current.geometry.attributes.uv;
    roomRef.current.geometry.attributes.uv2 =
      roomRef.current.geometry.attributes.uv;
  }, []);

  /**ANIMATE CUBES ON HOVER */
  const cube1 = useRef();
  const cube2 = useRef();
  const cube3 = useRef();
  const cube4 = useRef();

  const HoverUp = (reference, e) => {
    if (reference.current) {
      e.stopPropagation();
      const target = reference.current.position;
      gsap.to(target, { y: 0.83, duration: 1 });
    }
  };

  const ReturnPosition = (reference, e) => {
    if (reference.current) {
      e.stopPropagation();
      const target = reference.current.position;
      gsap.to(target, { y: 0.8, duration: 1 });
    }
  };

  useEffect(() => {
    switch (currentTexture) {
      case "robiniaBranson":
        deskRef.current.material.map = robiniaBranson;
        drawersRef.current.material.map = robiniaBranson;
        break;
      case "oak1":
        deskRef.current.material.map = oak1;
        drawersRef.current.material.map = oak1;
        break;
      case "oak2":
        deskRef.current.material.map = oak2;
        drawersRef.current.material.map = oak2;
        break;
      case "walnut":
        deskRef.current.material.map = walnut;
        drawersRef.current.material.map = walnut;
        break;
      default:
        deskRef.current.material.map = robiniaBranson;
        drawersRef.current.material.map = robiniaBranson;
    }
  }, [currentTexture, oak1, oak2, robiniaBranson, walnut]);

  return (
    <group {...props} dispose={null} scale={1} position={[0, -0.2, 0]}>
      {/**CUBES ON DESK */}
      <mesh
        ref={cube1}
        name="cube1"
        position={[-0.42, 0.8, -0.1]}
        onPointerEnter={(e) => HoverUp(cube1, e)}
        onPointerLeave={(e) => ReturnPosition(cube1, e)}
        onClick={() => update({ currentTexture: "robiniaBranson" })}
      >
        <boxGeometry args={[0.08, 0.08, 0.08]} />
        <meshStandardMaterial
          map={robiniaBransonClone}
          envMapIntensity={0.9}
          roughness={0.7}
        />
      </mesh>
      <mesh
        ref={cube2}
        name="cube2"
        position={[-0.31, 0.8, -0.1]}
        onPointerEnter={(e) => HoverUp(cube2, e)}
        onPointerLeave={(e) => ReturnPosition(cube2, e)}
        onClick={() => update({ currentTexture: "oak1" })}
      >
        <boxGeometry args={[0.08, 0.08, 0.08]} />
        <meshStandardMaterial
          map={oak1Clone}
          envMapIntensity={0.9}
          roughness={0.7}
        />
      </mesh>
      <mesh
        ref={cube3}
        name="cube3"
        position={[-0.2, 0.8, -0.1]}
        onPointerEnter={(e) => HoverUp(cube3, e)}
        onPointerLeave={(e) => ReturnPosition(cube3, e)}
        onClick={() => update({ currentTexture: "oak2" })}
      >
        <boxGeometry args={[0.08, 0.08, 0.08]} />
        <meshStandardMaterial
          map={oak2Clone}
          envMapIntensity={0.9}
          roughness={0.7}
        />
      </mesh>
      <mesh
        name="cube4"
        ref={cube4}
        position={[-0.09, 0.8, -0.1]}
        onPointerEnter={(e) => HoverUp(cube4, e)}
        onPointerLeave={(e) => ReturnPosition(cube4, e)}
        onClick={() => update({ currentTexture: "walnut" })}
      >
        <boxGeometry args={[0.08, 0.08, 0.08]} />
        <meshStandardMaterial
          map={walnutClone}
          envMapIntensity={0.9}
          roughness={0.7}
        />
      </mesh>

      <mesh
        ref={deskRef}
        geometry={nodes.Desk001.geometry}
        material={materials["iMeshh Wood70 4K.001"]}
        position={[-0.059966, 0, 0.050772]}
        rotation={[0, -1.570535, 0]}
      >
        <meshStandardMaterial
          map={robiniaBranson}
          aoMap={deskAO}
          aoMapIntensity={props.maps === true ? 0.8 : 0}
          envMapIntensity={0.8}
          roughness={0.7}
          lightMap={deskLM}
          lightMapIntensity={props.maps === true ? 0.8 : 0}
        />
      </mesh>
      <group position={[-0.059966, 0, 0.050772]} rotation={[0, -1.570535, 0]}>
        <mesh
          ref={drawersRef}
          geometry={nodes.Roundcube001.geometry}
          material={materials["iMeshh Wood70 4K.001"]}
          position={[0.222136, 0.613031, -0.496007]}
        >
          <meshStandardMaterial
            map={robiniaBranson}
            aoMap={drawersAO}
            roughness={0.7}
            aoMapIntensity={props.maps === true ? 0.8 : 0}
            lightMap={drawersLM}
            lightMapIntensity={props.maps === true ? 1.4 : 0}
          />
        </mesh>
      </group>
      <group
        position={[0.431448, 0.784661, 0.235016]}
        rotation={[Math.PI / 2, 0, -0.129959]}
        scale={[1, 1, 1.183377]}
      >
        <mesh
          geometry={nodes.Plane003_1.geometry}
          material={materials["Magazine Cover1.001"]}
        />
        <mesh
          geometry={nodes.Plane003_2.geometry}
          material={materials["Magazine Edge.001"]}
        />
      </group>
      <group
        position={[0.421017, 0.768425, 0.236253]}
        rotation={[Math.PI / 2, 0, -0.233391]}
        scale={[0.937412, 0.937412, 1.945639]}
      >
        <mesh
          geometry={nodes.Plane005_1.geometry}
          material={materials["Magazine Cover1.002"]}
        />
        <mesh
          geometry={nodes.Plane005_2.geometry}
          material={materials["Magazine Edge.001"]}
        />
      </group>
      <mesh
        ref={roomRef}
        geometry={nodes.Room.geometry}
        position={[2.376106, 0, 2.693998]}
        rotation={[0, 1.570535, 0]}
      >
        <meshStandardMaterial
          aoMap={roomAO}
          aoMapIntensity={props.maps === true ? 0.8 : 0}
          color={new Color(0x25333e)}
          lightMap={roomLM}
          lightMapIntensity={props.maps === true ? 1.3 : 0}
        />
      </mesh>
      <mesh
        ref={plintRef}
        geometry={nodes.Baseboard.geometry}
        material={materials.Baseboard_material}
        position={[2.376106, 0, 2.693998]}
        rotation={[0, 1.570535, 0]}
      >
        <meshStandardMaterial
          aoMap={plintAO}
          aoMapIntensity={props.maps === true ? 0.7 : 0}
          envMapIntensity={1}
          lightMap={plintLM}
          lightMapIntensity={props.maps === true ? 1.2 : 0}
        />
      </mesh>
      <mesh
        ref={floorRef}
        geometry={nodes.Floor.geometry}
        material={materials.Floor_material}
        position={[2.376106, 0, 2.693998]}
        rotation={[0, 1.570535, 0]}
      >
        <meshStandardMaterial
          map={floorAlbedo}
          aoMap={floorAO}
          lightMap={floorLM}
          aoMapIntensity={props.maps === true ? 0.9 : 0}
          lightMapIntensity={props.maps === true ? 1.4 : 0}
          envMapIntensity={0.8}
          roughness={0.8}
        />
      </mesh>
      <mesh
        ref={ceilingRef}
        geometry={nodes.Ceiling.geometry}
        material={materials.Ceiling_material}
        position={[2.376106, 0, 2.693998]}
        rotation={[0, 1.570535, 0]}
      >
        <meshStandardMaterial
          aoMap={ceilingAO}
          aoMapIntensity={1.1}
          emissive={"#FFFFFF"}
          emissiveIntensity={0.25}
        />
      </mesh>
      <group
        position={[2.374411, 1.239825, 0.676351]}
        rotation={[0, -1.570535, 0]}
      >
        <mesh
          geometry={nodes.Plane015.geometry}
          material={materials["1200WindowFrame2 "]}
        />
        <mesh
          geometry={nodes.Plane015_1.geometry}
          material={materials["1200WindowFrame2 "]}
        />
      </group>
      <mesh
        geometry={nodes["1200_Window_Glass"].geometry}
        position={[2.374411, 1.239825, 0.676351]}
        rotation={[0, -1.570535, 0]}
      >
        <meshStandardMaterial
          toneMapped={false}
          color={"white"}
          emissive={"white"}
          emissiveIntensity={0.63}
        />
      </mesh>
      <group
        position={[-0.058407, 1.552035, -0.263254]}
        rotation={[-Math.PI / 2, 0, -Math.PI]}
        scale={0.22748}
      >
        <mesh
          geometry={nodes.iMeshh_Picture_Frame1_1.geometry}
          material={materials["Black painted Wood"]}
        />
        <mesh
          geometry={nodes.iMeshh_Picture_Frame1_2.geometry}
          material={materials.Picture3}
        />
      </group>
      <group
        position={[-0.632793, 1.551956, -0.263455]}
        rotation={[Math.PI / 2, 0, Math.PI]}
        scale={0.385098}
      >
        <mesh
          geometry={nodes.iMeshh_Picture_Frame1002.geometry}
          material={materials["Black painted Wood"]}
        />
        <mesh
          geometry={nodes.iMeshh_Picture_Frame1002_1.geometry}
          material={materials.Picture2}
        />
      </group>
      <group
        position={[0.510842, 1.551916, -0.262681]}
        rotation={[-Math.PI / 2, -Math.PI / 2, 0]}
        scale={0.55}
      >
        <mesh
          geometry={nodes.iMeshh_Picture_Frame1001_1.geometry}
          material={materials["Black painted Wood"]}
        />
        <mesh
          geometry={nodes.iMeshh_Picture_Frame1001_2.geometry}
          material={materials.Picture1}
        />
      </group>
      <mesh
        geometry={nodes.Plane.geometry}
        material={materials.crowning}
        position={[-2.193169, 1.224893, -0.3293]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.239658, 1, 0.64415]}
      />
      <mesh
        geometry={nodes.Plane003.geometry}
        material={materials.crowning}
        position={[-1.465852, 1.224893, -0.3293]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.239658, 1, 0.64415]}
      />
      <mesh
        geometry={nodes.Plane006.geometry}
        material={materials.crowning}
        position={[1.264254, 1.224893, -0.3293]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.239658, 1, 0.64415]}
      />
      <mesh
        geometry={nodes.Plane009.geometry}
        material={materials.crowning}
        position={[2.012831, 1.224893, -0.3293]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.239658, 1, 0.64415]}
      />
      <mesh
        geometry={nodes.Plane002.geometry}
        material={materials.crowning}
        position={[-2.193169, 2.052421, -0.333092]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.239658, 1, 0.107914]}
      />
      <mesh
        geometry={nodes.Plane001.geometry}
        material={materials.crowning}
        position={[-2.193169, 0.369506, -0.333092]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.239658, 1, 0.107914]}
      />
      <mesh
        geometry={nodes.Plane004.geometry}
        material={materials.crowning}
        position={[-1.465852, 2.052421, -0.333092]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.239658, 1, 0.107914]}
      />
      <mesh
        geometry={nodes.Plane005.geometry}
        material={materials.crowning}
        position={[-1.465852, 0.369506, -0.333092]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.239658, 1, 0.107914]}
      />
      <mesh
        geometry={nodes.Plane007.geometry}
        material={materials.crowning}
        position={[1.264254, 2.052421, -0.333092]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.239658, 1, 0.107914]}
      />
      <mesh
        geometry={nodes.Plane008.geometry}
        material={materials.crowning}
        position={[1.264254, 0.369506, -0.333092]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.239658, 1, 0.107914]}
      />
      <mesh
        geometry={nodes.Plane010.geometry}
        material={materials.crowning}
        position={[2.012831, 2.052421, -0.333092]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.239658, 1, 0.107914]}
      />
      <mesh
        geometry={nodes.Plane011.geometry}
        material={materials.crowning}
        position={[2.012831, 0.369506, -0.333092]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.239658, 1, 0.107914]}
      />
      <group position={[-0.580647, 0.756357, 0.01742]} scale={0.56}>
        <mesh
          geometry={nodes.Ottolo_Lamp_replica_1.geometry}
          material-toneMapped={false}
        >
          <meshStandardMaterial
            map={lampAlbedo}
            normalMap={lampNormals}
            roughnessMap={lampRoughness}
            metalness={1}
          />
        </mesh>
        <mesh
          geometry={nodes.Ottolo_Lamp_replica_2.geometry}
          material={materials["Inside Filament"]}
        />
        <mesh
          geometry={nodes.Ottolo_Lamp_replica_3.geometry}
          material={materials.LED}
        />
        <mesh
          geometry={nodes.Ottolo_Lamp_replica_4.geometry}
          material={materials.Metal}
        />
        <mesh
          geometry={nodes.Ottolo_Lamp_replica_5.geometry}
          material={materials.Plastic}
        />
        <mesh
          geometry={nodes.Ottolo_Lamp_replica_6.geometry}
          material={materials["Bulb Glass"]}
        />
        <mesh
          geometry={nodes.Ottolo_Lamp_replica_7.geometry}
          material={materials["Base Metal"]}
        />
        <mesh
          geometry={nodes.BezierCurve018.geometry}
          material={materials["Plastic Gloss Black.001"]}
          position={[-0.070778, 0.002335, -0.33171]}
          rotation={[-Math.PI, 0.826495, -Math.PI]}
          scale={0.150301}
        />
      </group>
      <mesh
        geometry={nodes.Ottolo_Lamp_replica001.geometry}
        position={[-0.580647, 0.756357, 0.01742]}
        material-toneMapped={false}
        scale={0.56}
      >
        <meshStandardMaterial
          map={lampAlbedo}
          normalMap={lampNormals}
          roughnessMap={lampRoughness}
          metalness={1}
        />
      </mesh>
      <mesh
        geometry={nodes.Tulip_Chair_Legs.geometry}
        position={[0, 0, 0.520791]}
        rotation={[Math.PI, -0.610865, Math.PI]}
      >
        <meshStandardMaterial metalness={1} roughness={0.1} />
      </mesh>
      <mesh
        ref={chairRef}
        geometry={nodes.Tulip_Chair_Top.geometry}
        material={materials["McAlister Plain Chenille Taupe"]}
        position={[0, 0, 0.520791]}
        rotation={[Math.PI, -0.610865, Math.PI]}
      >
        <meshStandardMaterial
          map={chairAlbedo}
          aoMap={chairAO}
          aoMapIntensity={props.maps === true ? 0.7 : 0}
          envMapIntensity={0.5}
          lightMap={chairLM}
          lightMapIntensity={props.maps === true ? 1 : 0}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/room.glb");
