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

import {
  OrbitControls,
  PerformanceMonitor,
  useProgress,
  useTexture,
} from "@react-three/drei";

import Environement from "./Environment";
import axios, { AxiosProgressEvent, AxiosRequestConfig } from "axios";
import FormData from "form-data";
import {
  PCFSoftShadowMap,
  SRGBColorSpace,
  Texture,
  TextureLoader,
} from "three";

import { Pages_024 } from "./New/Pages_024";
import { Pages_032 } from "./New/Pages_032";
import { Pages_040 } from "./New/Pages_040";
import { Animation_Controllers } from "./New/Animation_Controllers";
import { Book } from "./New/Book2";
import { Pages_016 } from "./New/Pages_016";
import { Pages_000 } from "./New/Pages_000";
import { Pages_008 } from "./New/Pages_008";
import { Pages_000_2 } from "./New/Pages_000_2";
import { One_Page } from "@/One_Page";
import { AllPages } from "@/AllPages";
type Props = {
  Video: File | null;
  setUploaded: Dispatch<SetStateAction<boolean | null>>;
  setPercentage: Dispatch<SetStateAction<number>>;
  setUploadProgress: Dispatch<SetStateAction<number>>;
};
export default function Scene({
  Video,
  setUploaded,
  setPercentage,
  setUploadProgress,
}: Props) {
  const [Textures, setTextures] = useState<Texture[]>([]);
  const [ImagesReady, setImagesReady] = useState<boolean>(false);
  const [StartAnimation, setStartAnimation] = useState<boolean>(false);
  useEffect(() => {
    if (Video) {
      const f = async () => {
        try {
          const data = new FormData();
          data.append("file", Video);
          data.append("_method", "put");
          console.log("Starting Video upload", data.getHeaders);
          const config: AxiosRequestConfig = {
            headers: data.getHeaders
              ? data.getHeaders()
              : { "Content-Type": "multipart/form-data" },
            onUploadProgress: function (progressEvent) {
              if (progressEvent.total) {
                const percentComplete = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                );
                console.log(percentComplete);
                setUploadProgress(percentComplete);
              }
            },
          };
          const res = await axios.post("/api/video", data, config);

          console.log("status :", res.status);
          console.log("File uploaded successfully", res.data);

          if (res.status == 200) {
            const Pages = GetTextures();
            console.log(Pages);
            setTextures(Pages);
            setImagesReady(true);

            setTimeout(() => {
              setStartAnimation(true);
            }, 1000);
            setUploaded(true);
          }
        } catch (error) {
          console.log("Upload Failed", error);
        }
      };

      f();
    }
  }, [Video]);
  //Loading

  const bool = false;
  const DifTexture = new Texture();
  DifTexture.image = "/Textures/Page_empty.jpg";
  const BumpTexture = new Texture();
  BumpTexture.image = "/Textures/Paper_Bump.jpg";

  const [dpr, setDpr] = useState(1);
  return (
    <Canvas
      dpr={dpr}
      style={{ opacity: 1 }}
      shadows
      gl={
        {
          // antialias: true,
        }
      }
      className="!absolute !top-1/2 -translate-y-1/2 z-0 !left-0 w-full h-full"
      camera={{
        position: [0, 6, 0],
        fov: 14,
        rotation: [0, Math.PI / 2, 0],
        near: 0.01,
      }}
      onCreated={(state) => (state.gl.toneMappingExposure = 1)}
    >
      <PerformanceMonitor
        factor={1}
        onChange={({ factor }) => setDpr(Math.floor(1.5 * factor))}
      />
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
        <planeGeometry args={[16, 16]}></planeGeometry>
        <meshStandardMaterial roughness={1} color={"#fdbcbb"} />
      </mesh>

      <FlipBook
        Textures={Textures}
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
  Textures = [],
  setUploaded,
  setImagesReady,
  setStartAnimation,
  setPercentage,
}: {
  bool: boolean;
  ImagesReady: boolean;
  StartAnimation: boolean;
  Textures: Texture[];
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
  BookCover_Base_Color.colorSpace = SRGBColorSpace;
  BookCover_Normal_map.colorSpace = SRGBColorSpace;
  BookCover_Roughness_map.colorSpace = SRGBColorSpace;
  // const dispatch = useAppDispatch();
  // // ------- //
  useEffect(() => {
    const value = ((loaded / 21) * 100).toFixed(0) as unknown as number;
    setPercentage(value);
  }, [progress, loaded, total]);
  return (
    <group scale={[5, 5, 5]}>
      <Animation_Controllers StartAnimation={StartAnimation}>
        <Suspense fallback={null}>
          {/* <Book
            castShadow
            DiffuseMap={BookCover_Base_Color}
            RoughnessMap={BookCover_Roughness_map}
            NormalMap={BookCover_Normal_map}
            ImagesReady={ImagesReady}
            StartAnimation={StartAnimation}
          /> */}
          <One_Page />

          {/* <AllPages /> */}
          {/* <Pages_000
            DiffuseMap={Paper_Color}
            BumpMap={Paper_Bump}
            ImagesReady={ImagesReady}
            StartAnimation={StartAnimation}
            setUploaded={setUploaded}
            setImagesReady={setImagesReady}
            setStartAnimation={setStartAnimation}
            castShadow
            Textures={Textures ? Textures.slice(0, 8) : []}
          /> */}
          {/* <Pages_008
            DiffuseMap={Paper_Color}
            BumpMap={Paper_Bump}
            ImagesReady={ImagesReady}
            StartAnimation={StartAnimation}
            castShadow
            Textures={Textures ? Textures.slice(8, 16) : []}
          />
          <Pages_016
            DiffuseMap={Paper_Color}
            BumpMap={Paper_Bump}
            ImagesReady={ImagesReady}
            StartAnimation={StartAnimation}
            castShadow
            Textures={Textures ? Textures.slice(16, 24) : []}
          />
          <Pages_024
            DiffuseMap={Paper_Color}
            BumpMap={Paper_Bump}
            ImagesReady={ImagesReady}
            StartAnimation={StartAnimation}
            castShadow
            Textures={Textures ? Textures.slice(24, 32) : []}
          />
          <Pages_032
            DiffuseMap={Paper_Color}
            BumpMap={Paper_Bump}
            ImagesReady={ImagesReady}
            StartAnimation={StartAnimation}
            castShadow
            Textures={Textures ? Textures.slice(32, 40) : []}
          />
          <Pages_040
            DiffuseMap={Paper_Color}
            BumpMap={Paper_Bump}
            ImagesReady={ImagesReady}
            StartAnimation={StartAnimation}
            castShadow
            Textures={Textures ? Textures.slice(40, 48) : []}
          /> */}
        </Suspense>
      </Animation_Controllers>
    </group>
  );
};

export const GetTextures = () => {
  const Pages: THREE.Texture[] = [];

  new Array(48).fill(0).map((value, index) => {
    const textureLoader = new TextureLoader();

    textureLoader.requestHeader = {
      "Cache-Control": "no-cache, no-store, must-revalidate",
    };
    const texture = textureLoader.load(
      `https://flip-book-pages.s3.eu-central-1.amazonaws.com/Pages_${String(
        index + 1
      ).padStart(3, "0")}.jpeg`
    );
    console.log(texture);
    texture.flipY = false;
    texture.colorSpace = SRGBColorSpace;
    Pages.push(texture);
  });
  return Pages;
};
