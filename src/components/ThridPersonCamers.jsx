import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function ThirdPersonCamera({ camPosition, user, }) {
  const vec = new THREE.Vector3([...camPosition].map((each, i) => {
    if (i === 0) {
      return each - 30;
    }
    if (i === 1) {
      return 140;
    }
    if (i === 2) {
      return each + 350;
    }

    return each;
  }));

  useFrame(({ camera }) => {
    if (user.name === "guest" && vec.z <= -6000) {
      props.handleCameraStop();

      return;
    }

    camera.position.lerp(vec, 0.1);
  });

  return null;
}

export default ThirdPersonCamera;
