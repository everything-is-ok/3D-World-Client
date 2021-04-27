/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable max-len */
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: SGD114101 (https://sketchfab.com/SGD114101)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/kitchen-scene-670c5b1fa9ed499cbb2b5f5bd48294e0
title: Kitchen Scene
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

function Table(props) {
  const group = useRef();
  const { nodes } = useGLTF("models/kitchen/scene.gltf");

  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[0, 0, -40]} name="tableGroup">
        <group position={[-3.86, 24.03, 40.59]} rotation={[3.12, 0.01, 3.11]}>
          <mesh geometry={nodes.cushion_02_redMat_0.geometry} material={nodes.cushion_02_redMat_0.material} />
        </group>
        <mesh geometry={nodes.chair_01_tan_Mat_0.geometry} material={nodes.chair_01_tan_Mat_0.material} />
        <group position={[-1.74, 0.47, -8.05]} rotation={[0, -0.05, 0]}>
          <mesh geometry={nodes.chair_02_tan_Mat_0.geometry} material={nodes.chair_02_tan_Mat_0.material} />
        </group>
        <mesh color="red" geometry={nodes.table_tan_Mat_0.geometry} material={nodes.table_tan_Mat_0.material} />
        <group position={[35.82, -0.97, 90.07]} rotation={[-3.13, 0.03, -3.1]}>
          <mesh geometry={nodes.cushion_01_redMat_0.geometry} material={nodes.cushion_01_redMat_0.material} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("models/kitchen/scene.gltf");

export default Table;
