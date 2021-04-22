import React, { useMemo, useRef } from "react";
import PropTypes from "prop-types";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";

function Text({
  children,
  position,
  vAlign,
  hAlign,
  size,
  color,
}) {
  // TODO: font file이 잘못된것인지, useLoader에서 오류 발생, 현재 사용 불가
  const font = useLoader(THREE.FontLoader, "fonts/bold.blob");
  const config = useMemo(
    () => ({
      font,
      size: 40,
      height: 30,
      curveSegments: 32,
      bevelEnabled: true,
      bevelThickness: 6,
      bevelSize: 2.5,
      bevelOffset: 0,
      bevelSegments: 8,
    }),
    [font],
  );
  const mesh = useRef(null);

  return (
    <group position={position} scale={[10 * size, 10 * size, 10]}>
      <mesh ref={mesh}>
        <textGeometry args={[children, config]} />
        <meshNormalMaterial />
      </mesh>
    </group>
  );
}

Text.propTypes = {
  children: PropTypes.string.isRequired,
  position: PropTypes.array.isRequired,
  vAlign: PropTypes.string,
  hAlign: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
};

Text.defaultProps = {
  vAlign: "center",
  hAlign: "center",
  size: 1.5,
  color: "#000000",
};

export default Text;
