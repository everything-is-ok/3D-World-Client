/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: softstar79 (https://sketchfab.com/softstar79)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/models/413c73b527904fcaa83ee8224d70fe43
title: lowpoly building
*/

import React, { Suspense, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import PropTypes from "prop-types";
import Texts from "./Texts";

export default function Model({ position, user, onClick }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("models/building/scene.gltf");

  return (
    <group
      ref={group}
      position={position}
      dispose={null}
      scale={[0.1, 0.1, 0.1]}
      onClick={(e) => onClick(e, user._id)}
    >
      <Suspense fallback={null}>
        <Texts
          scale={[10, 10, 10]}
          position={[-300, 3500, 500]}
          letters={user.email.split("@")[0]}
        />
      </Suspense>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes.mesh_0.geometry} material={materials.material_2} />
        <mesh geometry={nodes.mesh_1.geometry} material={materials.material_8} />
        <mesh geometry={nodes.mesh_2.geometry} material={materials.material_9} />
        <mesh geometry={nodes.mesh_3.geometry} material={materials.default} />
        <mesh geometry={nodes.mesh_4.geometry} material={nodes.mesh_4.material} />
        <mesh geometry={nodes.mesh_5.geometry} material={nodes.mesh_5.material} />
        <mesh geometry={nodes.mesh_6.geometry} material={nodes.mesh_6.material} />
        <mesh geometry={nodes.mesh_7.geometry} material={nodes.mesh_7.material} />
        <mesh geometry={nodes.mesh_8.geometry} material={nodes.mesh_8.material} />
        <mesh geometry={nodes.mesh_9.geometry} material={materials.material_5} />
        <mesh geometry={nodes.mesh_10.geometry} material={materials.material_6} />
        <mesh geometry={nodes.mesh_11.geometry} material={materials.material_7} />
        <mesh geometry={nodes.mesh_12.geometry} material={materials.material_10} />
        <mesh geometry={nodes.mesh_13.geometry} material={materials.material_11} />
      </group>
    </group>
  );
}

useGLTF.preload("models/building/scene.gltf");

Model.propTypes = {
  position: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};
