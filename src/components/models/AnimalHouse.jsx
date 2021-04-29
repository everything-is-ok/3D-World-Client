import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function AnimalHouse(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("models/animalHouse/scene.gltf");
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, -Math.PI / 2]}>
        <mesh geometry={nodes.House_Walls_Roof_0.geometry} material={materials.Walls_Roof} />
        <mesh geometry={nodes.House_Door_windows_0.geometry} material={materials.Door_windows} />
      </group>
    </group>
  );
}

useGLTF.preload("models/animalHouse/scene.gltf");
