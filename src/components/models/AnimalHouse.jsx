import React, { Suspense, useRef, useState } from "react";
import { Html, useGLTF } from "@react-three/drei";
import ReactPlayer from "react-player";
import PropTypes from "prop-types";
import Speaker from "./Speaker";
import Texts from "./Texts";

export default function AnimalHouse({
  user,
  position,
  scale,
  onBuildingClick,
}) {
  const group = useRef();
  const { nodes, materials } = useGLTF("models/animalHouse/scene.gltf");
  const [isMusicOn, setIsMusicOn] = useState(false);

  function onSpeakerClick(e) {
    e.stopPropagation();
    setIsMusicOn((prev) => !prev);
  }

  return (
    <>
      <Html>
        <ReactPlayer
          url={user.musicURL}
          playing={isMusicOn}
          width={0}
          height={0}
        />
      </Html>
      <group
        ref={group}
        dispose={null}
        scale={scale}
        position={position}
        onClick={(e) => onBuildingClick(e, user._id)}
      >
        <Suspense fallback={null}>
          <Speaker
            position={[150, 0, 100]}
            onClick={onSpeakerClick}
            scale={50}
          />
        </Suspense>
        <Suspense fallback={null}>
          <Texts
            scale={[3, 3, 3]}
            position={[-200, 300, 0]}
            letters={user.email.split("@")[0]}
          />
        </Suspense>
        <group rotation={[-Math.PI / 2, 0, -Math.PI / 2]}>
          <mesh geometry={nodes.House_Walls_Roof_0.geometry} material={materials.Walls_Roof} />
          <mesh geometry={nodes.House_Door_windows_0.geometry} material={materials.Door_windows} />
        </group>
      </group>
    </>
  );
}

AnimalHouse.propTypes = {
  position: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  scale: PropTypes.number.isRequired,
  onBuildingClick: PropTypes.func.isRequired,
};

useGLTF.preload("models/animalHouse/scene.gltf");
