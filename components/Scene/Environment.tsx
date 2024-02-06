import React from "react";
import {
  AccumulativeShadows,
  ContactShadows,
  Environment,
  RandomizedLight,
} from "@react-three/drei";

type Props = {};

export default function Environement({}: Props) {
  return (
    <>
      <spotLight
        shadow-mapSize-width={1024 * 2}
        shadow-mapSize-height={1024 * 2}
        rotation={[0, 0, 0]}
        castShadow
        intensity={6}
        position={[1.78 / 3, 4, 0.2]}
      ></spotLight>
      <spotLight
        shadow-mapSize-width={1024 * 2}
        shadow-mapSize-height={1024 * 2}
        rotation={[0, 0, 0]}
        castShadow
        intensity={6}
        position={[1.78 / 3, 4, 0.2]}
      ></spotLight>
      <pointLight
        shadow-mapSize-width={1024 * 2}
        shadow-mapSize-height={1024 * 2}
        castShadow
        position={[1.78 / 3, 4, 0.21]}
        intensity={6}
      />
      <pointLight
        shadow-mapSize-width={1024 * 2}
        shadow-mapSize-height={1024 * 2}
        castShadow
        position={[1.78 / 3, 4, 0.21]}
        intensity={12}
      />
      <pointLight
        shadow-mapSize-width={1024 * 2}
        shadow-mapSize-height={1024 * 2}
        castShadow
        position={[1.78 / 3, 4, 0.2]}
        intensity={12}
      />
      {/* <Environment preset="apartment" background /> */}
      {/* <AccumulativeShadows>
        <RandomizedLight position={[2, 5, 5]} />
      </AccumulativeShadows> */}
    </>
  );
}
