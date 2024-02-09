/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/Models/New/Animation_Controllers.glb --types 
*/

import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {};
  materials: {};
  animations: GLTFAction[];
};

type ActionName = "Action.001" | "Pages_Last_RotationAction";
interface GLTFAction extends THREE.AnimationClip {
  name: ActionName;
}

type propsBook = JSX.IntrinsicElements["group"] & {
  StartAnimation: Boolean;
};

export function Animation_Controllers(props: propsBook) {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials, animations } = useGLTF(
    "/Models/New/Animation_Controllers.glb"
  ) as GLTFResult;
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (props.StartAnimation) {
      Object.entries(actions).map(([key, value]) => {
        value?.setLoop(THREE.LoopOnce, 0);
        value?.play().reset();
      });
    }
  }, [props.StartAnimation]);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group
          name="Book_Controller"
          position={[-0.061, 0.005, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <group
            name="Pages_Last_Rotation"
            position={[0.061, 0, 0.005]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            {props.children}
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/Models/New/Animation_Controllers.glb");
