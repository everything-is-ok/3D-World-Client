import React from "react";
import PropTypes from "prop-types";
import { Shadow, Stars } from "@react-three/drei";

function Universe({ position, radius }) {
  return (
    <>
      <color attach="background" args={["black"]} />
      <group position={position}>
        <Stars radius={radius} />
      </group>
      <mesh position={[-250, 100, -250]} scale={[30, 30, 30]}>
        <sphereBufferGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color="#fcfabb" toneMapped={false} fog={false} />
        <Shadow scale={[12, 12, 1]} opacity={0.7} color="#fcfabb" />
      </mesh>
      <Shadow position={[10, -100, -400]} scale={[600, 200, 100]} opacity={1} stop={0} color="gray" />
    </>
  );
}

Universe.propTypes = {
  position: PropTypes.array.isRequired,
  radius: PropTypes.number.isRequired,
};

export default Universe;
