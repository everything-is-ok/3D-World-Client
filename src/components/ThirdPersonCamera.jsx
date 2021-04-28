import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

function getThridPersonCameraPosition(position) {
  const formattedPosition = position.map((pos, index) => {
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

  const vec = new THREE.Vector3(...formattedPosition);

  return vec;
}

function ThirdPersonCamera({ position, hasLimit }) {
  const vec = getThridPersonCameraPosition(position);
  useFrame(({ camera }) => {
    if (hasLimit) {
      if (vec.z <= -6000 || vec.z > 350) {
        return;
      }
    }

    camera.position.lerp(vec, 0.1);
  });

  return null;
}

export default ThirdPersonCamera;
