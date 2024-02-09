import React, { Ref, useEffect, useRef } from "react";
import {
  AccumulativeShadows,
  ContactShadows,
  Environment,
  RandomizedLight,
} from "@react-three/drei";
import { PointLight, SpotLight, Vector3 } from "three";
import { useControls } from "leva";

type Props = {};

export default function Environement({}: Props) {
  // const cords = new Vector3(1.78 / 3, 4, 0.2);
  const cords = new Vector3(1 / 3, 4, 0);

  // const { enabled,  } = useControls({
  //   enabled: true,
  //   radius: { value: 3.2, min: 0, max: 10 },
  //   blurSamples: { value: 25, min: 1, max: 30, step: 1 },
  // });
  const radius = 3.2;
  const blurSamples = 25;
  const spotLight = useRef<SpotLight>(null);
  const pointLight = useRef<PointLight>(null);
  useEffect(() => {
    if (spotLight.current && pointLight.current) {
      spotLight.current.shadow.blurSamples = 25;
      spotLight.current.shadow.radius = 3;

      // shadow-camera-far={50}
      // shadow-camera-left={-20}
      // shadow-camera-right={20}
      // shadow-camera-top={20}
      // shadow-camera-bottom={-20}
    }
  }, []);
  return (
    <>
      {/* <spotLight
        shadow-radius={radius}
        shadow-mapSize-width={1024 * 2}
        shadow-mapSize-height={1024 * 2}
        rotation={[0, 0, 0]}
        castShadow
        intensity={6}
        position={cords}
      ></spotLight> */}
      <spotLight
        ref={spotLight}
        shadow-radius={radius}
        shadow-mapSize-width={1024 * 4}
        shadow-mapSize-height={1024 * 4}
        rotation={[0, 0, 0]}
        castShadow
        intensity={12}
        position={cords}
      ></spotLight>
      {/* <pointLight
        shadow-radius={radius}
        shadow-mapSize-width={1024 * 2}
        shadow-mapSize-height={1024 * 2}
        castShadow
        position={cords}
        intensity={6}
      />
      <pointLight
        shadow-radius={radius}
        shadow-mapSize-width={1024 * 2}
        shadow-mapSize-height={1024 * 2}
        castShadow
        position={cords}
        intensity={12}
      /> */}
      <pointLight
        ref={pointLight}
        shadow-radius={radius}
        shadow-mapSize-width={1024 * 4}
        shadow-mapSize-height={1024 * 4}
        castShadow
        position={cords}
        intensity={24}
      />
      {/* <Environment preset="apartment" background /> */}
      {/* <AccumulativeShadows>
        <RandomizedLight position={[2, 5, 5]} />
      </AccumulativeShadows> */}
    </>
  );
}
