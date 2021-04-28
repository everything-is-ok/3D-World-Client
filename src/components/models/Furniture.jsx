/* eslint-disable react/prop-types */
import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { useAspect } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

import ChildFurniture from "./ChildFurniture";

const Tag = ({ position }) => {
  const mesh = useRef(null);
  const [_, y] = position;

  return (
    <mesh
      ref={mesh}
      scale={1}
      position={[0, y + 20, 0]}
    >
      <boxBufferGeometry attach="geometry" args={[50, 30, 70]} />
      <meshStandardMaterial
        attach="material"
        color="#fd5d41"
      />
    </mesh>
  );
};

// const Triangle = ({ position, color }) => {
//   const mesh = useRef(null);

//   return (
//     <mesh castShadow ref={mesh} position={position}>
//       <tetrahedronGeometry
//         attach="geometry"
//         args={[0.6, 0]}
//         applyMatrix={new THREE.Matrix4().makeRotationAxis(
//           new THREE.Vector3(2, 0, -1).normalize(),
//           Math.atan(Math.sqrt(2))
//         )}
//       />
//       <meshStandardMaterial attach="material" color={color} />
//     </mesh>
//   );
// };

function Furniture({ name, position, onClick }) {
  const group = useRef();
  const mesh = useRef();

  const [isSelected, setIsSelected] = useState(false);
  const { viewport } = useThree();
  const size = useAspect("cover", 50, 50, 1 - (50 / viewport.width));
  console.log(size);

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
      >
        <Tag position={position} />
        <ChildFurniture name={name} />
      </mesh>
    </group>
  );
}

Furniture.propTypes = {
  name: PropTypes.string.isRequired,
  position: PropTypes.array,
  onClick: PropTypes.func,
};

export default Furniture;
