/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: daniloulf (https://sketchfab.com/daniloulf)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/space-taxi-rigged-with-animation-08b2ec2316314df3b11eaeea7bef514e
title: Space Taxi (Rigged, with Animation)
*/

import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("models/spaceTaxi/scene.gltf");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    actions.landing_2.play();

    return () => actions.landing_2.stop();
  }, []);

  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group scale={[1.16, 1.16, 1.16]}>
          <group rotation={[Math.PI / 2, 0, 0]}>
            <group position={[-0.01, 2.16, -1.39]}>
              <primitive object={nodes.GLTF_created_0_rootJoint} />
              <skinnedMesh
                geometry={nodes.mesh_0.geometry}
                material={materials.mat_spaceTaxi}
                skeleton={nodes.mesh_0.skeleton}
              />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("models/spaceTaxi/scene.gltf");
