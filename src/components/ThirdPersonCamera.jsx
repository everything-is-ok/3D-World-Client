import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useMemo } from "react";

function getThridPersonCameraPosition(position) {
  return position.map((pos, index) => {
    if (index === 0) {
      return pos - 30;
    }
    if (index === 1) {
      return 140;
    }
    if (index === 2) {
      return pos + 350;
    }

    return pos;
  });
}

function ThirdPersonCamera({ positionRef, hasLimit }) {
  const vec = useMemo(() => new THREE.Vector3());

  useFrame(({ camera }) => {
    if (hasLimit) {
      if (vec.z <= -6000 || vec.z > 350) {
        return;
      }
    }

    camera.position.lerp(
      vec.set(...getThridPersonCameraPosition(positionRef.current)),
      0.1,
    );
  });

  return null;
}

export default ThirdPersonCamera;
