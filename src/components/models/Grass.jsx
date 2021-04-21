import React, { useRef } from "react";
import PropTypes from "prop-types";

function Grass({ position, onClick }) {
  const mesh = useRef();

  return (
    <mesh
      ref={mesh}
      scale={1}
      position={[...position]}
      onClick={onClick}
    >
      <boxGeometry args={[39, 10, 39]} />
      <meshStandardMaterial color="green" />
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
