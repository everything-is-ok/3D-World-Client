import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  TextureLoader,
  RepeatWrapping,
} from "three";

import grassImg from "./textures/grass.jpeg";

function Grass({ position, onClick, currItemId }) {
  const mesh = useRef();
  const texture = new TextureLoader().load(grassImg);
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(10, 10);

  const [hovered, setHover] = useState(!!currItemId);

  return (
    <mesh
      ref={mesh}
      scale={1}
      position={[...position]}
      onClick={onClick}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxBufferGeometry attach="geometry" args={[39, 10, 39]} />
      <meshStandardMaterial
        map={texture}
        attach="material"
        color={hovered ? "hotpink" : "green"}
      />
    </mesh>
  );
}

Grass.propTypes = {
  position: PropTypes.array.isRequired,
  onClick: PropTypes.func,
  currItemId: PropTypes.string,
};

Grass.defaultProps = {
  onClick: () => {},
};

export default Grass;
