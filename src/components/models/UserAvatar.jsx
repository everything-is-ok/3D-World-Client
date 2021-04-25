/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: mahdo (https://sketchfab.com/mahdo)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/crossy-road-b7e2910d0ffe4da5860dedf39a7131d1
title: Crossy Road
*/

import React, { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import Chicken from "./Chicken";
import usePosition from "../../hooks/usePosition";
import useUserSocket from "../../hooks/useUserSocket";

export default function Model({ ...props }) {
  const { position: initialPosition, socket, user } = props;
  const { position, direction } = usePosition(initialPosition);
  const { fetchNewPositionToWorld } = useUserSocket(socket, position);

  useEffect(() => {
    fetchNewPositionToWorld(props.user._id, position, direction);

    props.socket.on("newUser", () => {
      props.socket.emit("sendPosition", {
        user,
        position,
        direction,
      });
    });

    return () => props.socket.off("newUser");
  }, [position]);

  function ThirdPersonCamera({ camPosition }) {
    const vec = new THREE.Vector3(...camPosition.map((each, i) => {
      if (i === 0) {
        return each - 30;
      }
      if (i === 1) {
        return each + 140;
      }
      if (i === 2) {
        return each + 350;
      }

      return each;
    }));
    useFrame(({ camera }) => {
      camera.position.lerp(vec, 0.1);
    });

    return null;
  }

  return (
    <>
      <Chicken
        position={position || initialPosition}
        direction={direction}
        name={user.name}
      />
      <ThirdPersonCamera camPosition={position} />
    </>
  );
}

useGLTF.preload("models/chicken/scene.gltf");
