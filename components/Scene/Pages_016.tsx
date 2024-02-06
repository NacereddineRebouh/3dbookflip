/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 Pages_016.glb --types --transform 
Files: Pages_016.glb [45.13MB] > C:\Users\Origin Systems\Desktop\Job\MyWork\work\3D BookFlip\bookflip\public\Models\Pages_016-transformed.glb [43.57MB] (3%)
*/

import * as THREE from "three";
import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { GetTextures } from "./Pages_000";

type GLTFResult = GLTF & {
  nodes: {
    Pages_016: THREE.Mesh;
    Pages_017: THREE.Mesh;
    Pages_018: THREE.Mesh;
    Pages_019: THREE.Mesh;
    Pages_020: THREE.Mesh;
    Pages_021: THREE.Mesh;
    Pages_022: THREE.Mesh;
    Pages_023: THREE.Mesh;
  };
  materials: {
    ["Opaline Paper"]: THREE.MeshStandardMaterial;
  };
  animations: GLTFAction[];
};

type ActionName =
  | "Key.020Action"
  | "Key.021Action"
  | "Key.022Action"
  | "Key.023Action"
  | "Key.024Action"
  | "Key.025Action"
  | "Key.026Action"
  | "Key.027Action";
interface GLTFAction extends THREE.AnimationClip {
  name: ActionName;
}
type ContextType = Record<
  string,
  React.ForwardRefExoticComponent<JSX.IntrinsicElements["mesh"]>
>;

type propsBook = JSX.IntrinsicElements["group"] & {
  DiffuseMap: THREE.Texture;
  BumpMap: THREE.Texture;
  StartAnimation: Boolean;
  ImagesReady: Boolean;
};
export function Pages_016(props: propsBook) {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials, animations } = useGLTF(
    "/Models/Transformed/Pages_016.glb"
  ) as GLTFResult;
  const { actions } = useAnimations(animations, group);
  const nodesArray = Object.entries(nodes);
  materials["Opaline Paper"].needsUpdate = true;
  materials["Opaline Paper"].map = props.DiffuseMap;
  const materialsArray = new Array(8).fill(materials["Opaline Paper"]);
  const [Materials, setMaterials] =
    useState<THREE.MeshStandardMaterial[]>(materialsArray); // Assuming image exists by default

  useEffect(() => {
    if (props.ImagesReady) {
      const Pages = GetTextures(nodesArray, 16);
      const mt: THREE.MeshStandardMaterial[] = [];
      Materials.map((material, index) => {
        const mat = material.clone();
        mat.map = Pages[index];
        mat.needsUpdate = true;
        mt.push(mat);
      });
      setMaterials(mt);
    } else {
      setMaterials(materialsArray);
    }
  }, [props.ImagesReady]);
  useEffect(() => {
    if (props.StartAnimation)
      Object.entries(actions).map(([key, value]) => {
        value?.setLoop(THREE.LoopOnce, 0);
        value?.play().reset();
      });
  }, [props.StartAnimation]);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        {Materials.map((material, index) => {
          return (
            <mesh
              key={index}
              castShadow
              name={nodesArray[index + 1][0]}
              geometry={nodesArray[index + 1][1].geometry}
              material={material}
              morphTargetDictionary={
                nodesArray[index + 1][1].morphTargetDictionary
              }
              morphTargetInfluences={
                nodesArray[index + 1][1].morphTargetInfluences
              }
            />
          );
        })}
        {/* <mesh
          castShadow
          name="Pages_016"
          geometry={nodes.Pages_016.geometry}
          material={materials["Opaline Paper"]}
          morphTargetDictionary={nodes.Pages_016.morphTargetDictionary}
          morphTargetInfluences={nodes.Pages_016.morphTargetInfluences}
        />
        <mesh
          castShadow
          name="Pages_017"
          geometry={nodes.Pages_017.geometry}
          material={materials["Opaline Paper"]}
          morphTargetDictionary={nodes.Pages_017.morphTargetDictionary}
          morphTargetInfluences={nodes.Pages_017.morphTargetInfluences}
        />
        <mesh
          castShadow
          name="Pages_018"
          geometry={nodes.Pages_018.geometry}
          material={materials["Opaline Paper"]}
          morphTargetDictionary={nodes.Pages_018.morphTargetDictionary}
          morphTargetInfluences={nodes.Pages_018.morphTargetInfluences}
        />
        <mesh
          castShadow
          name="Pages_019"
          geometry={nodes.Pages_019.geometry}
          material={materials["Opaline Paper"]}
          morphTargetDictionary={nodes.Pages_019.morphTargetDictionary}
          morphTargetInfluences={nodes.Pages_019.morphTargetInfluences}
        />
        <mesh
          castShadow
          name="Pages_020"
          geometry={nodes.Pages_020.geometry}
          material={materials["Opaline Paper"]}
          morphTargetDictionary={nodes.Pages_019.morphTargetDictionary}
          morphTargetInfluences={nodes.Pages_019.morphTargetInfluences}
        />
        <mesh
          castShadow
          name="Pages_021"
          geometry={nodes.Pages_021.geometry}
          material={materials["Opaline Paper"]}
          morphTargetDictionary={nodes.Pages_021.morphTargetDictionary}
          morphTargetInfluences={nodes.Pages_021.morphTargetInfluences}
        />
        <mesh
          castShadow
          name="Pages_022"
          geometry={nodes.Pages_022.geometry}
          material={materials["Opaline Paper"]}
          morphTargetDictionary={nodes.Pages_022.morphTargetDictionary}
          morphTargetInfluences={nodes.Pages_022.morphTargetInfluences}
        />
        <mesh
          castShadow
          name="Pages_023"
          geometry={nodes.Pages_023.geometry}
          material={materials["Opaline Paper"]}
          morphTargetDictionary={nodes.Pages_023.morphTargetDictionary}
          morphTargetInfluences={nodes.Pages_023.morphTargetInfluences}
        /> */}
      </group>
    </group>
  );
}

//useGLTF.preload("/Models/Transformed/Pages_016.glb");
