/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/Models/New/Pages_032.glb --types 
*/

import * as THREE from "three";
import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Plane_032: THREE.Mesh;
    Plane_032_1: THREE.Mesh;
    Plane_036: THREE.Mesh;
    Plane_036_1: THREE.Mesh;
    Plane_037: THREE.Mesh;
    Plane_037_1: THREE.Mesh;
    Plane_035: THREE.Mesh;
    Plane_035_1: THREE.Mesh;
    Plane_033: THREE.Mesh;
    Plane_033_1: THREE.Mesh;
    Plane_034: THREE.Mesh;
    Plane_034_1: THREE.Mesh;
    Plane_038: THREE.Mesh;
    Plane_038_1: THREE.Mesh;
    Plane_039: THREE.Mesh;
    Plane_039_1: THREE.Mesh;
  };
  materials: {
    ["Opaline Paper"]: THREE.MeshStandardMaterial;
    White: THREE.MeshStandardMaterial;
  };
  animations: GLTFAction[];
};

type ActionName =
  | "Key.032Action"
  | "Key.036Action"
  | "Key.037Action"
  | "Key.035Action"
  | "Key.033Action"
  | "Key.034Action"
  | "Key.038Action"
  | "Key.039Action";
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
  Textures: THREE.Texture[];
};

export function Pages_032(props: propsBook) {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials, animations } = useGLTF(
    "/Models/New/Pages_032.glb"
  ) as GLTFResult;
  const { actions } = useAnimations(animations, group);

  const nd = Object.entries(nodes);
  const nodesArray = nd.filter((item) => {
    if (item[0].startsWith("Plane") && !item[0].endsWith("_1")) {
      return true;
    }
    return false;
  });
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
          name="Plane_032_1"
          geometry={nodes.Plane_032_1.geometry}
          material={materials.White}
          morphTargetDictionary={nodes.Plane_032_1.morphTargetDictionary}
          morphTargetInfluences={nodes.Plane_032_1.morphTargetInfluences}
        />

        <mesh
          name="Plane_036_1"
          geometry={nodes.Plane_036_1.geometry}
          material={materials.White}
          morphTargetDictionary={nodes.Plane_036_1.morphTargetDictionary}
          morphTargetInfluences={nodes.Plane_036_1.morphTargetInfluences}
        />

        <mesh
          name="Plane_037_1"
          geometry={nodes.Plane_037_1.geometry}
          material={materials.White}
          morphTargetDictionary={nodes.Plane_037_1.morphTargetDictionary}
          morphTargetInfluences={nodes.Plane_037_1.morphTargetInfluences}
        />

        <mesh
          name="Plane_035_1"
          geometry={nodes.Plane_035_1.geometry}
          material={materials.White}
          morphTargetDictionary={nodes.Plane_035_1.morphTargetDictionary}
          morphTargetInfluences={nodes.Plane_035_1.morphTargetInfluences}
        />

        <mesh
          name="Plane_033_1"
          geometry={nodes.Plane_033_1.geometry}
          material={materials.White}
          morphTargetDictionary={nodes.Plane_033_1.morphTargetDictionary}
          morphTargetInfluences={nodes.Plane_033_1.morphTargetInfluences}
        />

        <mesh
          name="Plane_034_1"
          geometry={nodes.Plane_034_1.geometry}
          material={materials.White}
          morphTargetDictionary={nodes.Plane_034_1.morphTargetDictionary}
          morphTargetInfluences={nodes.Plane_034_1.morphTargetInfluences}
        />

        <mesh
          name="Plane_038_1"
          geometry={nodes.Plane_038_1.geometry}
          material={materials.White}
          morphTargetDictionary={nodes.Plane_038_1.morphTargetDictionary}
          morphTargetInfluences={nodes.Plane_038_1.morphTargetInfluences}
        />

        <mesh
          name="Plane_039_1"
          geometry={nodes.Plane_039_1.geometry}
          material={materials.White}
          morphTargetDictionary={nodes.Plane_039_1.morphTargetDictionary}
          morphTargetInfluences={nodes.Plane_039_1.morphTargetInfluences}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/Models/New/Pages_032.glb");
