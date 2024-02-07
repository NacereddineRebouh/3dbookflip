"use client";

import { Canvas, useLoader } from "@react-three/fiber";
import React, {
  Dispatch,
  SetStateAction,
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";
import { Perf } from "r3f-perf";

import {
  ContactShadows,
  OrbitControls,
  useProgress,
  useTexture,
} from "@react-three/drei";
import { Book } from "./Book";
import { Pages_000 } from "./Pages_000";
import { Pages_008 } from "./Pages_008";
import { Pages_016 } from "./Pages_016";
import { Pages_024 } from "./Pages_024";
import { Pages_032 } from "./Pages_032";
import { Pages_040 } from "./Pages_040";
import Environement from "./Environment";
import axios, { AxiosProgressEvent, AxiosRequestConfig } from "axios";
import FormData from "form-data";
type Props = {
  Video: File | null;
  setUploaded: Dispatch<SetStateAction<boolean | null>>;
  setPercentage: Dispatch<SetStateAction<number>>;
};
export default function Scene({ Video, setUploaded, setPercentage }: Props) {
  const [ImagesReady, setImagesReady] = useState<boolean>(false);
  const [StartAnimation, setStartAnimation] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  useEffect(() => {
    // console.log("uploadProgress;", uploadProgress);
  }, [uploadProgress]);
  useEffect(() => {
    if (Video) {
      const f = async () => {
        try {
          //     const reader = new FileReader();

          // reader.onload = function(event) {
          //   if(event.ta)
          //     const fileData = event.target.result;

          // };

          // console.log("Starting Video upload", Video);

          const data = new FormData();
          data.append("file", Video);
          data.append("_method", "put");
          // const res = await fetch(`/api/video`, {
          //   method: "POST",
          //   headers: {
          //     "Content-Type": "multipart/form-data",
          //   },
          //   body: formData,
          // });
          // console.log("res:", res);

          setUploadProgress(0);

          const config: AxiosRequestConfig = {
            headers: {
              // "Content-Type": "multipart/form-data",
              ...data.getHeaders(),
            },
            onUploadProgress: function (progressEvent) {
              if (progressEvent.total) {
                const percentComplete = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                );

                setUploadProgress(percentComplete);
              }
            },
          };

          // console.log(data);
          const res = await axios.post("/api/video", data, config);

          console.log("File uploaded successfully", res.data);

          if (res.status == 200) {
            setImagesReady(true);

            setTimeout(() => {
              setStartAnimation(true);
            }, 1000);
            setUploaded(true);
            // console.log(
            // "// -------------- Starting the animation ....-------------- //"
            // );
          }
        } catch (error) {
          // console.log("Upload Failed");
        }
      };

      f();
    }
  }, [Video]);
  //Loading

  const bool = false;
  return (
    <Canvas
      style={{ opacity: 1 }}
      shadows
      gl={{
        antialias: true,
      }}
      className="!absolute !top-1/2 -translate-y-1/2 z-0 !left-0 w-full h-full"
      camera={{
        position: [0, 6, 0],
        fov: 14,
        rotation: [0, Math.PI / 2, 0],
        near: 0.01,
      }}
      onCreated={(state) => (state.gl.toneMappingExposure = 1)}
    >
      {/* <Perf /> */}
      <Environement />
      <ambientLight intensity={1} color={"white"} />

      <OrbitControls enableZoom />
      {/* <Model /> */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.005, 0]}
        receiveShadow
        castShadow={false}
      >
        <planeGeometry args={[6, 4]}></planeGeometry>
        <meshStandardMaterial roughness={1} color={"#fdbcbb"} />
      </mesh>
      <FlipBook
        bool={bool}
        setPercentage={setPercentage}
        setUploaded={setUploaded}
        setImagesReady={setImagesReady}
        ImagesReady={ImagesReady}
        StartAnimation={StartAnimation}
        setStartAnimation={setStartAnimation}
      />
    </Canvas>
  );
}

const FlipBook = ({
  bool = false,
  ImagesReady = false,
  StartAnimation = false,
  setUploaded,
  setImagesReady,
  setStartAnimation,
  setPercentage,
}: {
  bool: boolean;
  ImagesReady: boolean;
  StartAnimation: boolean;
  setUploaded: Dispatch<SetStateAction<boolean | null>>;
  setImagesReady: Dispatch<SetStateAction<boolean>>;
  setStartAnimation: Dispatch<SetStateAction<boolean>>;
  setPercentage: Dispatch<SetStateAction<number>>;
}) => {
  const [
    Paper_Color,
    Paper_Bump,
    BookCover_Base_Color,
    BookCover_Normal_map,
    BookCover_Roughness_map,
  ] = useTexture([
    "/Textures/Page_empty.jpg",
    "/Textures/Paper_Bump.jpg",
    "/Textures/BookCover_Base_Color.webp",
    "/Textures/BookCover_Normal_map.webp",
    "/Textures/BookCover_Roughness_map.webp",
  ]);
  const { progress, loaded, total } = useProgress();
  // const dispatch = useAppDispatch();
  // // ------- //
  useEffect(() => {
    const value = ((loaded / 24) * 100).toFixed(0) as unknown as number;
    setPercentage(value);
  }, [progress, loaded]);
  return (
    <group scale={[5, 5, 5]}>
      <Book
        castShadow
        DiffuseMap={BookCover_Base_Color}
        RoughnessMap={BookCover_Roughness_map}
        NormalMap={BookCover_Normal_map}
        ImagesReady={ImagesReady}
        StartAnimation={StartAnimation}
      />
      <Suspense fallback={null}>
        <Pages_000
          DiffuseMap={Paper_Color}
          BumpMap={Paper_Bump}
          ImagesReady={ImagesReady}
          StartAnimation={StartAnimation}
          setUploaded={setUploaded}
          setImagesReady={setImagesReady}
          setStartAnimation={setStartAnimation}
          castShadow
        />
        <Pages_008
          DiffuseMap={Paper_Color}
          BumpMap={Paper_Bump}
          castShadow
          ImagesReady={ImagesReady}
          StartAnimation={StartAnimation}
        />
        <Pages_016
          DiffuseMap={Paper_Color}
          BumpMap={Paper_Bump}
          castShadow
          ImagesReady={ImagesReady}
          StartAnimation={StartAnimation}
        />
        <Pages_024
          DiffuseMap={Paper_Color}
          BumpMap={Paper_Bump}
          castShadow
          ImagesReady={ImagesReady}
          StartAnimation={StartAnimation}
        />
        <Pages_032
          DiffuseMap={Paper_Color}
          BumpMap={Paper_Bump}
          castShadow
          ImagesReady={ImagesReady}
          StartAnimation={StartAnimation}
        />
        <Pages_040
          DiffuseMap={Paper_Color}
          BumpMap={Paper_Bump}
          castShadow
          ImagesReady={ImagesReady}
          StartAnimation={StartAnimation}
        />
      </Suspense>
    </group>
  );
};

function calculateAspectRatioString(width: number, height: number) {
  const ratio: number = height / width;
  return { a: 1, b: ratio };
}
