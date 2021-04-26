import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

import Table from "./Table";
import LongTree from "./LongTree";
import Closet from "./Closet";

function Furniture({ name, position, onClick }) {
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
        {name === "Table" && <Table />}
        {name === "LongTree" && <LongTree />}
        {name === "Closet" && <Closet />}
      </mesh>
    </group>
  );
}

Furniture.propTypes = {
  name: PropTypes.string.isRequired,
  position: PropTypes.array.isRequired,
  onClick: PropTypes.func,
};

export default Furniture;
