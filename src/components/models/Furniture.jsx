import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

import Table from "./Table";

function Furniture({ position, onClick }) {
  const group = useRef();
  const mesh = useRef();

  const [isSelected, setIsSelected] = useState(false);

  function handleClick() {
    setIsSelected((prev) => !prev);
    onClick();
  }

  return (
    <group ref={group} position={position}>
      <mesh
        ref={mesh}
        rotation={[0, 0, 0]}
        onClick={handleClick}
        color={isSelected ?? "red"}
      >
        <Table args={[40, 40, 40]} isSelected />
        {/* <meshStandardMaterial /> */}
      </mesh>
    </group>
  );
}

Furniture.propTypes = {
  position: PropTypes.array.isRequired,
  onClick: PropTypes.func,
};

export default Furniture;
