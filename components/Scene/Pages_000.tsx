/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 Pages_000.glb --types --transform 
Files: Pages_000.glb [45.76MB] > C:\Users\Origin Systems\Desktop\Job\MyWork\work\3D BookFlip\bookflip\public\Models\Pages_000-transformed.glb [44.19MB] (3%)
*/

import * as THREE from "three";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useGLTF, useAnimations, useTexture } from "@react-three/drei";
import { GLTF } from "three-stdlib";
type GLTFResult = GLTF & {
  nodes: {
    Pages_000: THREE.Mesh;
    Pages_001: THREE.Mesh;
    Pages_002: THREE.Mesh;
    Pages_003: THREE.Mesh;
    Pages_004: THREE.Mesh;
    Pages_005: THREE.Mesh;
    Pages_006: THREE.Mesh;
    Pages_007: THREE.Mesh;
  };
  materials: {
    ["Opaline Paper"]: THREE.MeshStandardMaterial;
  };
  animations: GLTFAction[];
};

type ActionName =
  | "Key.052Action"
  | "Key.005Action"
  | "Key.006Action"
  | "Key.007Action"
  | "Key.008Action"
  | "Key.009Action"
  | "Key.010Action"
  | "Key.011Action";
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
  setUploaded: Dispatch<SetStateAction<boolean | null>>;
  setImagesReady: Dispatch<SetStateAction<boolean>>;
  setStartAnimation: Dispatch<SetStateAction<boolean>>;
};

export function Pages_000(props: propsBook) {
  const group = useRef<THREE.Group>(null);
  const { scene, nodes, materials, animations } = useGLTF(
    "/Models/Transformed/Pages_000.glb"
  ) as GLTFResult;
  const { actions } = useAnimations(animations, group);

  const nodesArray = Object.entries(nodes);
  materials["Opaline Paper"].map = props.DiffuseMap;
  materials["Opaline Paper"].needsUpdate = true;
  const materialsArray = new Array(8).fill(materials["Opaline Paper"]);
  const [Materials, setMaterials] =
    useState<THREE.MeshStandardMaterial[]>(materialsArray); // Assuming image exists by default

  useEffect(() => {
    if (props.ImagesReady) {
      const Pages = GetTextures(nodesArray, 0);
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
    if (props.StartAnimation) {
      actions["Key.005Action"]
        ?.getMixer()
        .addEventListener("finished", onFinshed);
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
          name="Pages_000"
          geometry={nodes.Pages_000.geometry}
          material={materials["Opaline Paper"]}
          morphTargetDictionary={nodes.Pages_000.morphTargetDictionary}
          morphTargetInfluences={nodes.Pages_000.morphTargetInfluences}
        />
        <mesh
          castShadow
          name="Pages_001"
          geometry={nodes.Pages_001.geometry}
          material={materials["Opaline Paper"]}
          morphTargetDictionary={nodes.Pages_001.morphTargetDictionary}
          morphTargetInfluences={nodes.Pages_001.morphTargetInfluences}
        />
        <mesh
          castShadow
          name="Pages_002"
          geometry={nodes.Pages_002.geometry}
          material={materials["Opaline Paper"]}
          morphTargetDictionary={nodes.Pages_002.morphTargetDictionary}
          morphTargetInfluences={nodes.Pages_002.morphTargetInfluences}
        />
        <mesh
          castShadow
          name="Pages_003"
          geometry={nodes.Pages_003.geometry}
          material={materials["Opaline Paper"]}
          morphTargetDictionary={nodes.Pages_003.morphTargetDictionary}
          morphTargetInfluences={nodes.Pages_003.morphTargetInfluences}
        />
        <mesh
          castShadow
          name="Pages_004"
          geometry={nodes.Pages_004.geometry}
          material={materials["Opaline Paper"]}
          morphTargetDictionary={nodes.Pages_004.morphTargetDictionary}
          morphTargetInfluences={nodes.Pages_004.morphTargetInfluences}
        />
        <mesh
          castShadow
          name="Pages_005"
          geometry={nodes.Pages_005.geometry}
          material={materials["Opaline Paper"]}
          morphTargetDictionary={nodes.Pages_005.morphTargetDictionary}
          morphTargetInfluences={nodes.Pages_005.morphTargetInfluences}
        />
        <mesh
          castShadow
          name="Pages_006"
          geometry={nodes.Pages_006.geometry}
          material={materials["Opaline Paper"]}
          morphTargetDictionary={nodes.Pages_006.morphTargetDictionary}
          morphTargetInfluences={nodes.Pages_006.morphTargetInfluences}
        />
        <mesh
          castShadow
          name="Pages_007"
          geometry={nodes.Pages_007.geometry}
          material={materials["Opaline Paper"]}
          morphTargetDictionary={nodes.Pages_007.morphTargetDictionary}
          morphTargetInfluences={nodes.Pages_007.morphTargetInfluences}
        /> */}
      </group>
    </group>
  );
}

export const GetTextures = (nodesArray: any, offset: number) => {
  const Pages: THREE.Texture[] = [];

  new Array(8).fill(0).map((value, index) => {
    const textureLoader = new THREE.TextureLoader();

    textureLoader.requestHeader = {
      "Cache-Control": "no-cache, no-store, must-revalidate",
    };
    const texture = textureLoader.load(
      `./screens/Pages_${String(offset + index + 1).padStart(3, "0")}.jpeg`
    );
    // console.log(texture);
    texture.flipY = false;
    texture.colorSpace = THREE.SRGBColorSpace;
    Pages.push(texture);
  });
  return Pages;
};
//useGLTF.preload("/Models/Transformed/Pages_000.glb");
