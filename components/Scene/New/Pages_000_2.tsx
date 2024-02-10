/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/Models/New/Pages_000.glb --types 
*/

import * as THREE from "three";
import React, {
  Dispatch,
  Fragment,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Plane: THREE.Mesh;
    Plane_1: THREE.Mesh;
    Plane_001: THREE.Mesh;
    Plane_001_1: THREE.Mesh;
    Plane_002: THREE.Mesh;
    Plane_002_1: THREE.Mesh;
    Plane_003: THREE.Mesh;
    Plane_003_1: THREE.Mesh;
    Plane_005: THREE.Mesh;
    Plane_005_1: THREE.Mesh;
    Plane_004: THREE.Mesh;
    Plane_004_1: THREE.Mesh;
    Plane_006: THREE.Mesh;
    Plane_006_1: THREE.Mesh;
    Plane_007: THREE.Mesh;
    Plane_007_1: THREE.Mesh;
  };
  materials: {
    ["Opaline Paper"]: THREE.MeshStandardMaterial;
    White: THREE.MeshStandardMaterial;
  };
  animations: GLTFAction[];
};

type propsBook = JSX.IntrinsicElements["group"] & {
  DiffuseMap: THREE.Texture;
  BumpMap: THREE.Texture;
  StartAnimation: Boolean;
  ImagesReady: Boolean;
  Textures: THREE.Texture[];
  setUploaded: Dispatch<SetStateAction<boolean | null>>;
  setImagesReady: Dispatch<SetStateAction<boolean>>;
  setStartAnimation: Dispatch<SetStateAction<boolean>>;
};

type ActionName =
  | "Key.003Action"
  | "Key.005Action"
  | "Key.004Action"
  | "Key.006Action"
  | "Key.007Action"
  | "Key.002Action"
  | "Key.001Action"
  | "KeyAction";
interface GLTFAction extends THREE.AnimationClip {
  name: ActionName;
}
type ContextType = Record<
  string,
  React.ForwardRefExoticComponent<JSX.IntrinsicElements["mesh"]>
>;

export function Pages_000_2(props: propsBook) {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials, animations } = useGLTF(
    "/Models/New/Pages_000.glb"
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
    const onFinshed = () => {
      props.setImagesReady(false);
      props.setStartAnimation(false);
      props.setUploaded(null);
      actions["Key.005Action"]
        ?.getMixer()
        .removeEventListener("finished", onFinshed);
    };
    if (props.StartAnimation || true) {
      actions["Key.005Action"]
        ?.getMixer()
        .addEventListener("finished", onFinshed);
      Object.entries(actions).map(([key, value]) => {
        value?.setLoop(THREE.LoopRepeat, 10);
        value?.play().reset();
      });
    }
  }, [props.StartAnimation]);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        {Materials.map((material, index) => {
          return (
            <Fragment key={index}>
              <mesh
                castShadow
                name={nodesArray[0][0]}
                geometry={nodesArray[0][1].geometry}
                position={[0, 0.005 * index, 0]}
                material={material}
                morphTargetDictionary={nodesArray[0][1].morphTargetDictionary}
                morphTargetInfluences={nodesArray[0][1].morphTargetInfluences}
              />

              <mesh
                name="Plane_1"
                geometry={nodes.Plane_1.geometry}
                material={materials.White}
                morphTargetDictionary={nodes.Plane_1.morphTargetDictionary}
                morphTargetInfluences={nodes.Plane_1.morphTargetInfluences}
              />
            </Fragment>
          );
        })}

        {/* <mesh
          name="Plane_003_1"
          geometry={nodes.Plane_003_1.geometry}
          material={materials.White}
          morphTargetDictionary={nodes.Plane_003_1.morphTargetDictionary}
          morphTargetInfluences={nodes.Plane_003_1.morphTargetInfluences}
        /> */}

        {/* <mesh
          name="Plane_005_1"
          geometry={nodes.Plane_005_1.geometry}
          material={materials.White}
          morphTargetDictionary={nodes.Plane_005_1.morphTargetDictionary}
          morphTargetInfluences={nodes.Plane_005_1.morphTargetInfluences}
        />
        <mesh
          name="Plane_004_1"
          geometry={nodes.Plane_004_1.geometry}
          material={materials.White}
          morphTargetDictionary={nodes.Plane_004_1.morphTargetDictionary}
          morphTargetInfluences={nodes.Plane_004_1.morphTargetInfluences}
        />
        <mesh
          name="Plane_006_1"
          geometry={nodes.Plane_006_1.geometry}
          material={materials.White}
          morphTargetDictionary={nodes.Plane_006_1.morphTargetDictionary}
          morphTargetInfluences={nodes.Plane_006_1.morphTargetInfluences}
        />
        <mesh
          name="Plane_007_1"
          geometry={nodes.Plane_007_1.geometry}
          material={materials.White}
          morphTargetDictionary={nodes.Plane_007_1.morphTargetDictionary}
          morphTargetInfluences={nodes.Plane_007_1.morphTargetInfluences}
        />

        <mesh
          name="Plane_002_1"
          geometry={nodes.Plane_002_1.geometry}
          material={materials.White}
          morphTargetDictionary={nodes.Plane_002_1.morphTargetDictionary}
          morphTargetInfluences={nodes.Plane_002_1.morphTargetInfluences}
        />
        <mesh
          name="Plane_001_1"
          geometry={nodes.Plane_001_1.geometry}
          material={materials.White}
          morphTargetDictionary={nodes.Plane_001_1.morphTargetDictionary}
          morphTargetInfluences={nodes.Plane_001_1.morphTargetInfluences}
        />
        <mesh
          name="Plane_1"
          geometry={nodes.Plane_1.geometry}
          material={materials.White}
          morphTargetDictionary={nodes.Plane_1.morphTargetDictionary}
          morphTargetInfluences={nodes.Plane_1.morphTargetInfluences}
        /> */}
      </group>
    </group>
  );
}

//useGLTF.preload("/Models/New/Pages_000.glb");