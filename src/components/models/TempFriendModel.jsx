import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Html } from "@react-three/drei";

function TempFriendModel({ name, position, direction }) {
  const group = useRef();
  const mesh = useRef();

  return (
    <group
      ref={group}
      position={position}
    >
      {/* NOTE: <textGeomety>로 하려고했는데, 현재 font load하는 부분인지 진행이 되지않아 html로 이름 표시함 */}
      <Html position={[-2, 25, 0]}>
        <h3>{name}</h3>
      </Html>
      <mesh
        ref={mesh}
        rotation={[0, direction, 0]}
      >
        <boxGeometry args={[30, 30, 30]} />
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
