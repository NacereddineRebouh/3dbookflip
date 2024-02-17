"use client";
import { Montserrat } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import VideoUploadButton from "@/components/VideoUploadButton";
import dynamic from "next/dynamic";
import axios, { AxiosRequestConfig } from "axios";
import FormData from "form-data";
import { GetTextures } from "@/components/Scene/Scene";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { Crop } from "react-image-crop";

const mont = Montserrat({ subsets: ["latin"] });
const FrameCropDynamic = dynamic(() => import("@/components/FrameCrop"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export default function Home() {
  const [Video, setVideo] = useState<{
    video: File | null;
    width: number;
    height: number;
  } | null>(null);
  const [UploadStatus, setUploadStatus] = useState<string>("Upload a video");
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [Frame, setFrame] = useState<any>(null);
  useEffect(() => {
    console.log("UploadStatus", UploadStatus);
  }, [UploadStatus]);

  // const load = async () => {
  //   const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
  //   const ffmpeg = ffmpegRef.current;
  //   ffmpeg.on("log", ({ message }) => {
  //     console.log("LOG:", message);
  //   });
  //   // toBlobURL is used to bypass CORS issue, urls with the same
  //   // domain can be used directly.
  //   await ffmpeg.load({
  //     coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
  //     wasmURL: await toBlobURL(
  //       `${baseURL}/ffmpeg-core.wasm`,
  //       "application/wasm"
  //     ),
  //   });
  // };
  // useEffect(() => {
  //   load();
  // }, []);

  // useEffect(() => {
  //   if (Video && CroppedRegion) {
  //     const f = async () => {
  //       try {
  //         const data = new FormData();
  //         data.append("file", Video.video as any);
  //         data.append("CroppedRegion", CroppedRegion as any);
  //         data.append("_method", "put");
  //         console.log("Starting Video upload", data.getHeaders);
  //         const config: AxiosRequestConfig = {
  //           headers: data.getHeaders
  //             ? data.getHeaders()
  //             : { "Content-Type": "multipart/form-data" },
  //           onUploadProgress: function (progressEvent) {
  //             if (progressEvent.total) {
  //               const percentComplete = Math.round(
  //                 (progressEvent.loaded * 100) / progressEvent.total
  //               );
  //               console.log(percentComplete);
  //               setUploadProgress(percentComplete);
  //             }
  //           },
  //         };
  //         const res = await axios.post("/api/video", data, config);

  //         console.log("status :", res.status);
  //         console.log("File uploaded successfully", res.data);

  //         if (res.status == 200) {
  //           const ffmpeg = ffmpegRef.current;
  //           await ffmpeg
  //             .writeFile("CroppedRegion.txt", JSON.stringify(CroppedRegion))
  //             .then(async (value) => {
  //               const file = await ffmpeg.readFile("CroppedRegion.json");
  //               const params = {
  //                 Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
  //                 Key: `CroppedRegion`,
  //                 Body: file,
  //               };

  //               const command = new PutObjectCommand(params);
  //               await s3Client.send(command);
  //             });

  //           const Pages = GetTextures();
  //           console.log(Pages);
  //           // setTextures(Pages);
  //           // setImagesReady(true);

  //           // setTimeout(() => {
  //           //   setStartAnimation(true);
  //           // }, 1000);
  //           // setUploaded(true);
  //         }
  //       } catch (error) {
  //         console.log("Upload Failed", error);
  //       }
  //     };

  //     f();
  //   }
  // }, [Video, CroppedRegion]);

  return (
    <main
      className={`flex bg-zinc-50 h-full flex-col min-h-screen py-10 md:py-20 items-center justify-center mx-auto max-w-[2100px] p-0 ${mont.className}`}
    >
      {/* <AnimatePresence mode="wait">
        {!Loaded && (
          <LoadingScreen percentage={percentage} setLoaded={setLoaded} />
        )}
      </AnimatePresence> */}

      {/* <Scene
        setUploadProgress={setUploadProgress}
        setPercentage={setPercentage}
        Video={Video}
        setUploaded={setUploaded}
      /> */}
      <FrameCropDynamic
        setUploadProgress={setUploadProgress}
        image={Frame}
        Video={Video}
        setUploadStatus={setUploadStatus}
      />
      <VideoUploadButton
        uploadProgress={uploadProgress}
        Uploaded={UploadStatus}
        setVideo={setVideo}
      />
    </main>
  );
}
