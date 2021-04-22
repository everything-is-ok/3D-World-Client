import React from "react";
import PropTypes from "prop-types";
import { Stars } from "@react-three/drei";

function Universe({ position, radius }) {
  return (
    <>
      <color attach="background" args={["black"]} />
      <group position={position}>
        <Stars radius={radius} />
      </group>
    </>
  );
}

Universe.propTypes = {
  position: PropTypes.array.isRequired,
  radius: PropTypes.number.isRequired,
};

export default Universe;
