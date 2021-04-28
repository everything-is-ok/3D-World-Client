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

import React, { useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";

import Chicken from "./Chicken";
import { worldSocket } from "../../utils/socket";
// TODO: prop types needed && get direction

export default function Model({ user }) {
  const [position, setPosition] = useState(user.position);
  const [direction, setDirection] = useState(user.direction);

  function updatePosition(userInfo) {
    setPosition([...userInfo.position]);
    setDirection(userInfo.direction);
  }

  useEffect(() => {
    worldSocket.listenUserMovement(user._id, updatePosition);
  }, []);

  return (
    <Chicken
      position={[...position]}
      direction={direction}
      name={user.name}
    />
  );
}

useGLTF.preload("models/chicken/scene.gltf");
