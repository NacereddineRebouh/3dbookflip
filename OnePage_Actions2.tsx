/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/Models/New/OnePage_Actions2.glb --types 
*/

import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Plane001: THREE.Mesh;
    Plane001_1: THREE.Mesh;
    Plane002: THREE.Mesh;
    Plane002_1: THREE.Mesh;
    Plane004: THREE.Mesh;
    Plane004_1: THREE.Mesh;
  };
  materials: {
    White: THREE.MeshStandardMaterial;
    ["Opaline Paper"]: THREE.MeshStandardMaterial;
  };
  animations: GLTFAction[];
};

type ActionName = "KeyAction.002" | "KeyAction.004" | "KeyAction.006";
interface GLTFAction extends THREE.AnimationClip {
  name: ActionName;
}
type ContextType = Record<
  string,
  React.ForwardRefExoticComponent<JSX.IntrinsicElements["mesh"]>
>;

export function Model(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials, animations } = useGLTF(
    "/OnePage_Actions2.glb"
  ) as GLTFResult;
  const { actions } = useAnimations(animations, group);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Page0_Actions">
          <mesh
            name="Plane001"
            geometry={nodes.Plane001.geometry}
            material={materials.White}
          />
          <mesh
            name="Plane001_1"
            geometry={nodes.Plane001_1.geometry}
            material={materials["Opaline Paper"]}
          />
        </group>
        <group name="Page0_Actions2">
          <mesh
            name="Plane002"
            geometry={nodes.Plane002.geometry}
            material={materials.White}
          />
          <mesh
            name="Plane002_1"
            geometry={nodes.Plane002_1.geometry}
            material={materials["Opaline Paper"]}
          />
        </group>
        <group name="Page0_Actions3">
          <mesh
            name="Plane004"
            geometry={nodes.Plane004.geometry}
            material={materials.White}
          />
          <mesh
            name="Plane004_1"
            geometry={nodes.Plane004_1.geometry}
            material={materials["Opaline Paper"]}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/OnePage_Actions2.glb");