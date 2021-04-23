import React, { useRef } from "react";
import PropTypes from "prop-types";
import {
  TextureLoader,
  RepeatWrapping,
} from "three";

import grassImg from "./textures/grass.jpeg";

function Grass({ position, onClick }) {
  const mesh = useRef();
  const texture = new TextureLoader().load(grassImg);
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(10, 10);

  return (
    <mesh
      receiveShadow
      ref={mesh}
      scale={1}
      position={[...position]}
      onClick={onClick}
    >
      <boxBufferGeometry attach="geometry" args={[39, 10, 39]} />
      <meshStandardMaterial map={texture} attach="material" color="green" />
    </mesh>
  );
}

Grass.propTypes = {
  position: PropTypes.array.isRequired,
  onClick: PropTypes.func,
};

Grass.defaultProps = {
  onClick: () => {},
};

export default Grass;
