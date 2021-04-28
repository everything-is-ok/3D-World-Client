import * as THREE from "three";
import PropTypes from "prop-types";
import { useFrame } from "@react-three/fiber";

export default function getThridPersonCameraPosition(position) {
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
