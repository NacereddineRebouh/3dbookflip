/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/Models/New/Pages_040.glb --types 
*/

import * as THREE from "three";
import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Plane_040: THREE.Mesh;
    Plane_040_1: THREE.Mesh;
    Plane_041: THREE.Mesh;
    Plane_041_1: THREE.Mesh;
    Plane_042: THREE.Mesh;
    Plane_042_1: THREE.Mesh;
    Plane_043: THREE.Mesh;
    Plane_043_1: THREE.Mesh;
    Plane_044: THREE.Mesh;
    Plane_044_1: THREE.Mesh;
    Plane_045: THREE.Mesh;
    Plane_045_1: THREE.Mesh;
    Plane_046: THREE.Mesh;
    Plane_046_1: THREE.Mesh;
    Plane_047: THREE.Mesh;
    Plane_047_1: THREE.Mesh;
  };
  materials: {
    ["Opaline Paper"]: THREE.MeshStandardMaterial;
    White: THREE.MeshStandardMaterial;
  };
  animations: GLTFAction[];
};

type ActionName =
  | "Key.044Action"
  | "Key.042Action"
  | "Key.045Action"
  | "Key.046Action"
  | "Key.047Action"
  | "Key.041Action"
  | "Key.043Action"
  | "Key.040Action";
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
  StartAnimation: boolean;
  ImagesReady: boolean;
  Textures: THREE.Texture[];
};

export function Pages_040(props: propsBook) {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials, animations } = useGLTF(
    "/Models/New/Pages_040.glb"
  ) as GLTFResult;
  const { actions } = useAnimations(animations, group);

  const nd = Object.entries(nodes);
  const nodesArray = nd.filter((item) => {
    if (item[0].startsWith("Plane") && !item[0].endsWith("_1")) {
      return true;
    }
    return false;
  });
  nodesArray.sort((a, b) => a[0].localeCompare(b[0]));
  materials["Opaline Paper"].color = new THREE.Color("white");
  materials["Opaline Paper"].map = props.DiffuseMap;
  materials["Opaline Paper"].map.flipY = false;
  materials["Opaline Paper"].needsUpdate = true;
  const materialsArray = new Array(8).fill(materials["Opaline Paper"]);
  const [Materials, setMaterials] =
    useState<THREE.MeshStandardMaterial[]>(materialsArray); // Assuming image exists by default

  useEffect(() => {
    if (props.ImagesReady && props.Textures) {
      const Pages = props.Textures;
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
        {Materials.map((material, index) => {
          return (
            <mesh
              key={index}
              castShadow
              name={nodesArray[index][0]}
              geometry={nodesArray[index][1].geometry}
              material={material}
              morphTargetDictionary={nodesArray[index][1].morphTargetDictionary}
              morphTargetInfluences={nodesArray[index][1].morphTargetInfluences}
            />
          );
        })}
        <mesh
          name="Plane_044_1"
          geometry={nodes.Plane_044_1.geometry}
          material={materials.White}
          morphTargetDictionary={nodes.Plane_044_1.morphTargetDictionary}
          morphTargetInfluences={nodes.Plane_044_1.morphTargetInfluences}
        />

        <mesh
          name="Plane_042_1"
          geometry={nodes.Plane_042_1.geometry}
          material={materials.White}
          morphTargetDictionary={nodes.Plane_042_1.morphTargetDictionary}
          morphTargetInfluences={nodes.Plane_042_1.morphTargetInfluences}
        />

        <mesh
          name="Plane_045_1"
          geometry={nodes.Plane_045_1.geometry}
          material={materials.White}
          morphTargetDictionary={nodes.Plane_045_1.morphTargetDictionary}
          morphTargetInfluences={nodes.Plane_045_1.morphTargetInfluences}
        />

        <mesh
          name="Plane_046_1"
          geometry={nodes.Plane_046_1.geometry}
          material={materials.White}
          morphTargetDictionary={nodes.Plane_046_1.morphTargetDictionary}
          morphTargetInfluences={nodes.Plane_046_1.morphTargetInfluences}
        />

        <mesh
          name="Plane_047_1"
          geometry={nodes.Plane_047_1.geometry}
          material={materials.White}
          morphTargetDictionary={nodes.Plane_047_1.morphTargetDictionary}
          morphTargetInfluences={nodes.Plane_047_1.morphTargetInfluences}
        />

        <mesh
          name="Plane_041_1"
          geometry={nodes.Plane_041_1.geometry}
          material={materials.White}
          morphTargetDictionary={nodes.Plane_041_1.morphTargetDictionary}
          morphTargetInfluences={nodes.Plane_041_1.morphTargetInfluences}
        />

        <mesh
          name="Plane_043_1"
          geometry={nodes.Plane_043_1.geometry}
          material={materials.White}
          morphTargetDictionary={nodes.Plane_043_1.morphTargetDictionary}
          morphTargetInfluences={nodes.Plane_043_1.morphTargetInfluences}
        />

        <mesh
          name="Plane_040_1"
          geometry={nodes.Plane_040_1.geometry}
          material={materials.White}
          morphTargetDictionary={nodes.Plane_040_1.morphTargetDictionary}
          morphTargetInfluences={nodes.Plane_040_1.morphTargetInfluences}
        />
      </group>
    </group>
  );
}

//useGLTF.preload("/Models/New/Pages_040.glb");
