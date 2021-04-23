import React, { useRef } from "react";
import PropTypes from "prop-types";

function TempFriendModel({ name, position, direction }) {
  const group = useRef();
  const mesh = useRef();

  return (
    <group
      ref={group}
      position={position}
    >
      <mesh
        ref={mesh}
        rotation={[0, direction, 0]}
      >
        <boxBufferGeometry args={[30, 30, 30]} />
        <meshStandardMaterial color="blue" />
      </mesh>
    </group>
  );
}

TempFriendModel.propTypes = {
  position: PropTypes.array.isRequired,
  direction: PropTypes.array.isRequired,
  name: PropTypes.string,
};

TempFriendModel.defaultProps = {
  name: "unKnown",
};

export default TempFriendModel;
