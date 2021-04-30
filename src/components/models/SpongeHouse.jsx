import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function SpongeHouse(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("models/spongeHouse/scene.gltf");
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <pointLight intensity={0.5} position={[0, 0, 900]} />
          <group position={[12.65, 48.76, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[0.78, 0.78, 0.74]}>
            <mesh geometry={nodes["House_03_-_Default_0"].geometry} material={materials["03_-_Default"]} />
            <mesh geometry={nodes["House_02_-_Default_0"].geometry} material={materials["02_-_Default"]} />
            <mesh geometry={nodes["House_07_-_Default_0"].geometry} material={materials["07_-_Default"]} />
            <mesh geometry={nodes["House_08_-_Default_0"].geometry} material={materials["08_-_Default"]} />
            <mesh geometry={nodes["House_09_-_Default_0"].geometry} material={materials["09_-_Default"]} />
          </group>
          {/* <group position={[9.25, -56.1, -0.98]} rotation={[-Math.PI / 2, 0, 0]} scale={[1.34, 1.34, 1.34]}>
            <mesh geometry={nodes["Skybox_13_-_Default_0"].geometry} material={materials["13_-_Default"]} />
          </group> */}
          {/* <group position={[9.25, -56.1, -0.98]} rotation={[-Math.PI / 2, 0, 0]} scale={[1.34, 1.34, 1.34]}>
            <mesh geometry={nodes["Object001_14_-_Default_0"].geometry} material={materials["14_-_Default"]} />
          </group> */}
          {/* <group position={[12.65, 48.76, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[0.78, 0.78, 0.74]}>
            <mesh geometry={nodes["Object002_15_-_Default_0"].geometry} material={materials["15_-_Default"]} />
            <mesh geometry={nodes["Object002_20_-_Default_0"].geometry} material={materials["20_-_Default"]} />
          </group> */}
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("models/spongeHouse/scene.gltf");
