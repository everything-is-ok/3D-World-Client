/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: media_mas (https://sketchfab.com/media_mas)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/armario-lowpoly-1c19c1e1c38c4e1b84d6d420ac312cea
title: Armario - Lowpoly
*/

import React, { useRef } from "react";
import PropTypes from "prop-types";
import { useGLTF } from "@react-three/drei";

import Tag from "./Tag";

function Closet(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("models/closet/scene.gltf");
  const { isSelected } = props;

  return (
    <group ref={group} {...props} dispose={null} scale={[3, 3, 3]}>
      {isSelected && <Tag position={[0, 50, 0]} args={[5, 0]} />}
      <group rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
        <mesh geometry={nodes.armario_00_LP_madera_0.geometry} material={materials.madera} />
        <mesh geometry={nodes.armario_00_LP_vidrio_0.geometry} material={materials.vidrio} />
        <mesh geometry={nodes.armario_00_LP_oro_0.geometry} material={materials.material} />
        <mesh geometry={nodes.armario_00_LP_metal_oscuro_0.geometry} material={materials.metal_oscuro} />
      </group>
    </group>
  );
}

Closet.propTypes = {
  isSelected: PropTypes.bool.isRequired,
};

export default Closet;

useGLTF.preload("models/closet/scene.gltf");
