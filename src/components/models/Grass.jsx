import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
// import {
//   TextureLoader,
//   RepeatWrapping,
// } from "three";

// import grassImg from "./textures/grass.jpeg";

function Grass({ position, onClick, currItemId }) {
  const mesh = useRef();

  // NOTE texture 렌더를 async로 바꿀 수 있는지 확인
  // let texture;
  // useEffect(async () => {
  //   texture = await new TextureLoader().load(grassImg);
  //   texture.wrapS = RepeatWrapping;
  //   texture.wrapT = RepeatWrapping;
  //   texture.repeat.set(10, 10);
  // }, []);

  const [hovered, setHover] = useState(false);

  function handleChange() {
    if (currItemId) {
      setHover(true);
    }
  }

  return (
    <mesh
      ref={mesh}
      scale={1}
      position={[...position]}
      onClick={onClick}
      onPointerOver={handleChange}
      onPointerOut={() => setHover(false)}
    >
      <boxBufferGeometry attach="geometry" args={[39, 10, 39]} />
      <meshStandardMaterial
        // map={texture}
        attach="material"
        color={hovered ? "tomato" : "green"}
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
