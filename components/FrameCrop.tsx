"use client";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import ReactCrop, { Crop } from "react-image-crop";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import "react-image-crop/dist/ReactCrop.css";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import axios, { AxiosRequestConfig } from "axios";
import { GetTextures } from "./Scene/Scene";
import FormData from "form-data";
type Props = {
  image: any | null;
  Video: { video: File | null; width: number; height: number } | null;
  // setCroppedRegion: Dispatch<
  //   SetStateAction<{
  //     realXoffset: number;
  //     realYoffset: number;
  //     realCropWidth: number;
  //     realCropHeight: number;
  //   } | null>
  // >;
  setUploadProgress: Dispatch<SetStateAction<number>>;
  setUploadStatus: Dispatch<SetStateAction<string>>;
};

const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_S3_REGION as string,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY as string,
  },
});

export default function FrameCrop({
  image,
  Video,
  setUploadProgress,
  setUploadStatus,
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const [Frame, setFrame] = useState<any>(null);
  const [crop, setCrop] = useState<Crop>();
  const [Generate, setGenerate] = useState<boolean>(false);

  const [CroppedRegion, setCroppedRegion] = useState<{
    realXoffset: number;
    realYoffset: number;
    realCropWidth: number;
    realCropHeight: number;
  } | null>(null);
  const cropContainer = useRef<ReactCrop>(null);

  const ffmpegRef = useRef(new FFmpeg());
  const load = async () => {
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
    const ffmpeg = ffmpegRef.current;
    ffmpeg.on("log", ({ message }) => {
      console.log("LOG:", message);
    });
    // toBlobURL is used to bypass CORS issue, urls with the same
    // domain can be used directly.
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        "application/wasm"
      ),
    });
    setLoaded(true);
  };
  useEffect(() => {
    load();
  }, []);

  // Get Frame
  useEffect(() => {
    const Thumbnail = async () => {
      console.log("Transcoding:", Video);
      if (Video?.video) {
        console.log("Got this:", Video);
        const ffmpeg = ffmpegRef.current;
        var urlBlob = URL.createObjectURL(Video.video);
        //Cropping 3MM from width and height
        // const real_width = Video.width / 300; // in inches
        // const real_height = Video.height / 300;
        // const widthPx = Math.round((0.12 * Video.width) / real_height); //3mm == 0.12inches
        // const heightPx = Math.round((0.12 * Video.height) / real_width);

        const widthPx = 35;
        const heightPx = 35;
        await ffmpeg.writeFile("UploadedVideo.mp4", await fetchFile(urlBlob));
        console.log(
          `crop=${Video.width - widthPx * 2}:${
            Video.height - heightPx * 2
          }:${widthPx}:${heightPx}`
        );
        await ffmpeg
          .exec([
            "-i",
            "UploadedVideo.mp4",
            "-ss",
            "00:00:02",
            "-vf",
            `crop=${Video.width - widthPx * 2}:${
              Video.height - heightPx * 2
            }:${widthPx}:${heightPx}`,
            "-frames:v",
            "1",
            "CroppedFrame.jpg",
          ])
          .then(async (value) => {
            const data: any = await ffmpeg.readFile("CroppedFrame.jpg");
            setFrame(
              URL.createObjectURL(
                new Blob([data.buffer], { type: "image/jpg" })
              )
            );
          });
      }
    };
    if (loaded) {
      Thumbnail();
    }
  }, [loaded, Video]);

  // start Generating

  useEffect(() => {
    if (Video && CroppedRegion && Generate) {
      const f = async () => {
        try {
          const data = new FormData();
          data.append("file", Video.video as any);
          data.append("_method", "put");
          console.log("Starting Video upload", data.getHeaders);
          setUploadStatus("Uploading...");
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
            const ffmpeg = ffmpegRef.current;
            await ffmpeg
              .writeFile("CroppedRegion.json", JSON.stringify(CroppedRegion))
              .then(async (value) => {
                const file = await ffmpeg.readFile("CroppedRegion.json");
                const params = {
                  Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
                  Key: `CroppedRegion.json`,
                  Body: file,
                };

                const command = new PutObjectCommand(params);
                await s3Client.send(command);
              });

            const Pages = GetTextures();
            console.log(Pages);
            // setTextures(Pages);
            // setImagesReady(true);

            // setTimeout(() => {
            //   setStartAnimation(true);
            // }, 1000);
            setUploadStatus("Generated successfully");
            setGenerate(false);
          }
        } catch (error) {
          console.log("Upload Failed", error);
        }
      };

      f();
    }
  }, [Video, CroppedRegion, Generate]);
  return (
    <div className=" flex py-4 flex-col items-center justify-between gap-y-8 md:gap-y-16 px-2 sm:px-4">
      {/* title */}
      <div className="flex flex-col items-center justify-start text-center gap-y-4 md:gap-y-6">
        <div className="sm:text-5xl text-3xl font-bold">
          Adjust video frames
        </div>
        <div className="sm:text-xl text-md ">
          Long desc text explaining how the user can adjust the video to fit the
          format
        </div>
      </div>

      {/* Crop tool */}

      {Frame ? (
        <ReactCrop
          style={{ strokeDasharray: "" }}
          ref={cropContainer}
          className=" max-w-full h-full max-h-[80vh]"
          crop={crop}
          aspect={1 / 1.41}
          onChange={(c) => {
            console.log();
            if (cropContainer.current?.componentRef.current && Video) {
              const containerWidth =
                cropContainer.current.componentRef.current.clientWidth;
              const containerHeight =
                cropContainer.current.componentRef.current.clientHeight;
              const cropValues = {
                realXoffset: (c.x / containerWidth) * Video.width,
                realYoffset: (c.y / containerHeight) * Video.height,
                realCropWidth: (c.width / containerWidth) * Video.width,
                realCropHeight: (c.height / containerHeight) * Video.height,
              };
              setCroppedRegion(cropValues);
              console.log(cropValues);
            }
            setCrop(c);
          }}
        >
          <img src={Frame} />
        </ReactCrop>
      ) : (
        <div className="border-[2px] border-zinc-700 border-dashed max-w-[90vw] aspect-video px-20 flex items-center justify-center h-full text-xl font-semibold italic drop-shadow-lg">
          Please upload a video
        </div>
      )}

      <button
        onClick={() => setGenerate(true)}
        className="rounded-md border border-gray-100 bg-white py-2 px-4 shadow-md hover:shadow-lg transition-all duration-200 active:shadow-sm"
      >
        <label className="flex items-center gap-x-2 cursor-pointer">
          <svg
            className="h-10 w-10 fill-zinc-700 stroke-zinc-700"
            stroke="currentColor"
            strokeWidth=""
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.0614 9.67972L16.4756 11.0939L17.8787 9.69083L16.4645 8.27662L15.0614 9.67972ZM16.4645 6.1553L20 9.69083L8.6863 21.0045L5.15076 17.469L16.4645 6.1553Z"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.364 5.06066L9.59619 6.82843L8.53553 5.76777L10.3033 4L11.364 5.06066ZM6.76778 6.82842L5 5.06067L6.06066 4L7.82843 5.76776L6.76778 6.82842ZM10.3033 10.364L8.53553 8.5962L9.59619 7.53554L11.364 9.3033L10.3033 10.364ZM7.82843 8.5962L6.06066 10.364L5 9.3033L6.76777 7.53554L7.82843 8.5962Z"
            />
          </svg>
          <span
            className={`text-gray-600 font-semibold ${
              Generate ? "animate-pulse" : ""
            }`}
          >
            {Generate ? "Generating..." : "Generate"}
          </span>
        </label>
      </button>
    </div>
  );
}
