import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { LoopRepeat } from "three";

export function AllPages(props: JSX.IntrinsicElements["group"]) {
  const { scene, materials, animations } = useGLTF(
    "https://flip-book-pages.s3.eu-central-1.amazonaws.com/All_Pages.glb"
  );
  const { actions } = useAnimations(animations);

  console.log(animations);
  useEffect(() => {
    Object.entries(actions).map((action, index) => {
      action[1]?.setLoop(LoopRepeat, 10);
      action[1]?.play().reset();
    });
  }, [actions]);

  return <primitive object={scene} />;
}
