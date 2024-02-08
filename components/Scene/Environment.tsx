import React, { Ref, useRef } from "react";
import {
  AccumulativeShadows,
  ContactShadows,
  Environment,
  RandomizedLight,
} from "@react-three/drei";
import { SpotLight, Vector3 } from "three";
import { useControls } from "leva";

type Props = {};

export default function Environement({}: Props) {
  const cords = new Vector3(1.78 / 3, 4, 0.2);
  // const { enabled,  } = useControls({
  //   enabled: true,
  //   radius: { value: 3.2, min: 0, max: 10 },
  //   blurSamples: { value: 25, min: 1, max: 30, step: 1 },
  // });
  const radius = 3.2;
  const blurSamples = 25;

  return (
    <>
      <spotLight
        shadow-radius={radius}
        shadow-blurSamples={blurSamples}
        shadow-mapSize-width={1024 * 2}
        shadow-mapSize-height={1024 * 2}
        rotation={[0, 0, 0]}
        castShadow
        intensity={6}
        position={cords}
      ></spotLight>
      <spotLight
        shadow-radius={radius}
        shadow-blurSamples={blurSamples}
        shadow-mapSize-width={1024 * 2}
        shadow-mapSize-height={1024 * 2}
        rotation={[0, 0, 0]}
        castShadow
        intensity={6}
        position={cords}
      ></spotLight>
      <pointLight
        shadow-radius={radius}
        shadow-blurSamples={blurSamples}
        shadow-mapSize-width={1024 * 2}
        shadow-mapSize-height={1024 * 2}
        castShadow
        position={cords}
        intensity={6}
      />
      <pointLight
        shadow-radius={radius}
        shadow-blurSamples={blurSamples}
        shadow-mapSize-width={1024 * 2}
        shadow-mapSize-height={1024 * 2}
        castShadow
        position={cords}
        intensity={12}
      />
      <pointLight
        shadow-radius={radius}
        shadow-blurSamples={blurSamples}
        shadow-mapSize-width={1024 * 2}
        shadow-mapSize-height={1024 * 2}
        castShadow
        position={cords}
        intensity={12}
      />
      {/* <Environment preset="apartment" background /> */}
      {/* <AccumulativeShadows>
        <RandomizedLight position={[2, 5, 5]} />
      </AccumulativeShadows> */}
    </>
  );
}
