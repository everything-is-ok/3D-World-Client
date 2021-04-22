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
// TODO: prop types needed && get direction

export default function Model({ user, socket }) {
  const [position, setPosition] = useState(user.position);
  const [direction, setDirection] = useState(user.direction);

  const username = user?.name.toUpperCase().replace(/ /g, "") || "NONAME";

  useEffect(() => {
    socket.on(`receive_position_${user.id}`, ({ newPosition, newDirection }) => {
      setPosition([...newPosition]);
      setDirection(newDirection);
    });
  }, [socket]);

  return (
    <Chicken
      position={[...position]}
      direction={direction}
      name={username}
    />
  );
}

useGLTF.preload("models/chicken/scene.gltf");
