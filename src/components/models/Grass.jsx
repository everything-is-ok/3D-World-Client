import React, { useRef } from "react";
import PropTypes from "prop-types";
// eslint-disable-next-line import/no-unresolved
import { useBox } from "@react-three/cannon";

function Grass({ position, onClick }) {
  const [ref] = useBox(() => ({ mass: 0, position, args: [39, 10, 39] }));

  return (
    <mesh
      ref={ref}
      scale={1}
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
