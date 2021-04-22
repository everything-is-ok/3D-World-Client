import React from "react";

export default function ChickenBox() {
  const chickenSize = 15;
  const zoom = 2;
  const chickPos = [0, 1, 20 * zoom];

  return (
    <>
      <group
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.2, 0.2, 0.2]}
        position={[...chickPos]}
      >
        <mesh
          castShadow
          receiveShadow
          position={[0, 20, 10 * zoom]}
        >
          <boxBufferGeometry
            args={[chickenSize * zoom, chickenSize * zoom, 20 * zoom]}
          />
          <meshPhongMaterial color={0xffffff} />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 20, 21 * zoom]}>
          <boxBufferGeometry
            args={[2 * zoom, 4 * zoom, 2 * zoom]}
          />
          <meshLambertMaterial color={0xF0619A} />
        </mesh>
      </group>
    </>
  );
}
