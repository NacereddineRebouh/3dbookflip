"use client";
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import ReactCrop, { Crop, makeAspectCrop } from "react-image-crop";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import "react-image-crop/dist/ReactCrop.css";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import axios, { AxiosRequestConfig } from "axios";
import { GetTextures } from "./Scene/Scene";
import FormData from "form-data";
import { FaXmark } from "react-icons/fa6";
import VideoUploadButton from "./VideoUploadButton";
type Props = {
  Video: { video: File | null; width: number; height: number } | null;
  // children: ReactNode;
  // setCroppedRegion: Dispatch<
  //   SetStateAction<{
  //     realXoffset: number;
  //     realYoffset: number;
  //     realCropWidth: number;
  //     realCropHeight: number;
  //   } | null>
  // >;
  // setUploadStatus: Dispatch<SetStateAction<string>>;
  setVideo: Dispatch<
    SetStateAction<{
      video: File | null;
      width: number;
      height: number;
    } | null>
  >;
};
console.log({
  region: process.env.NEXT_PUBLIC_AWS_S3_REGION as string,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY as string,
  },
});
const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_S3_REGION as string,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY as string,
  },
});

export default function FrameCrop({ Video, setVideo }: Props) {
  const [Hide, setHide] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [Frame, setFrame] = useState<any>(null);
  const [crop, setCrop] = useState<Crop>({
    height: 0,
    unit: "px",
    width: 0,
    x: 0,
    y: 0,
  });
  const [Generate, setGenerate] = useState<string>("Confirm");
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [AspectRatio, setAspectRatio] = useState<number>(1 / 1.41);
  const [UploadStatus, setUploadStatus] = useState<string>("Upload a video");
  useEffect(() => {
    console.log("UploadStatus", UploadStatus);
  }, [UploadStatus]);

  const [CroppedRegion, setCroppedRegion] = useState<{
    Xoffset: number;
    Yoffset: number;
    CropWidth: number;
    CropHeight: number;
    Orientation: string;
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
  useEffect(() => {
    if (Frame) setHide(true);
    else setHide(false);
  }, [Frame]);

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const { clientWidth: width, clientHeight: height } = e.currentTarget;
    let aspr = 1 / 1.41;
    console.log("e.currentTarget:", e.currentTarget);
    console.log("width:", width);
    console.log("height:", height);

    if (width > height) {
      //landscape
      aspr = 1.41 / 1;
      setAspectRatio(aspr);
    }
    const crop = makeAspectCrop(
      {
        // You don't need to pass a complete crop into
        // makeAspectCrop or centerCrop.
        unit: "px",
        width: width,
      },
      aspr,
      width,
      height
    );

    console.log("crop:", crop);
    setCrop(crop);
    if (cropContainer.current?.componentRef.current && Video) {
      const containerWidth =
        cropContainer.current.componentRef.current.clientWidth;
      const containerHeight =
        cropContainer.current.componentRef.current.clientHeight;

      console.log("containerHeight:", containerHeight);
      console.log("containerWidth:", containerWidth);
      let Orientation = "landscape";
      if (Video.width <= Video.height) {
        //portrait
        Orientation = "portrait";
      }
      const cropValues = {
        Xoffset: (crop.x / containerWidth) * Video.width,
        Yoffset: (crop.y / containerHeight) * Video.height,
        CropWidth: (crop.width / containerWidth) * Video.width,
        CropHeight: (crop.height / containerHeight) * Video.height,
        Orientation: Orientation,
      };
      console.log("cropValues:", cropValues);
      setCroppedRegion(cropValues);
    }
  };

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
    if (Video && CroppedRegion && Generate == "Generating...") {
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
              .writeFile(
                "/tmp/CroppedRegion.txt",
                JSON.stringify(CroppedRegion)
              )
              .then(async (value) => {
                const file = await ffmpeg.readFile("/tmp/CroppedRegion.txt");
                const params = {
                  Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
                  Key: `CroppedRegion.txt`,
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
            setGenerate("Generated!");
            setTimeout(() => {
              setGenerate("Generate");
            }, 4000);

            setFrame(null);
          }
        } catch (error) {
          console.log("Upload Failed", error);
        }
      };

      f();
    }
  }, [Video, CroppedRegion, Generate]);
  return (
    <div className=" flex py-4 flex-col items-center justify-start gap-y-8 md:gap-y-16 px-2 sm:px-4">
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
      {Video &&
        ((Video.height < 874 && Video.width < 624) ||
          (Video.width < 874 && Video.height < 624)) && (
          <div className="text-red-600 font-semibold animate-pulse">
            Resolution too low
          </div>
        )}
      {Frame ? (
        <ReactCrop
          locked={true}
          style={{ strokeDasharray: "" }}
          ref={cropContainer}
          className="max-w-full h-full max-h-[40vh] sm:max-h-[80vh]"
          crop={crop}
          aspect={AspectRatio}
          onChange={(c) => {
            console.log();
            if (cropContainer.current?.componentRef.current && Video) {
              const containerWidth =
                cropContainer.current.componentRef.current.clientWidth;
              const containerHeight =
                cropContainer.current.componentRef.current.clientHeight;
              let Orientation = "landscape";
              if (Video.width <= Video.height) {
                //portrait
                Orientation = "portrait";
              }
              const cropValues = {
                Xoffset: (c.x / containerWidth) * Video.width,
                Yoffset: (c.y / containerHeight) * Video.height,
                CropWidth: (c.width / containerWidth) * Video.width,
                CropHeight: (c.height / containerHeight) * Video.height,
                Orientation: Orientation,
              };
              setCroppedRegion(cropValues);
              console.log(cropValues);
            }
            setCrop(c);
          }}
        >
          <img src={Frame} onLoad={onImageLoad} />
        </ReactCrop>
      ) : (
        <></>
        // <div className="border-[2px] border-zinc-700 border-dashed max-w-[90vw] aspect-video px-20 flex items-center justify-center h-full text-xl font-semibold italic drop-shadow-lg">
        //   Please upload a video
        // </div>
      )}
      {/* <div
        className="w-full h-full mx-auto flex items-center justify-center"
        style={{ visibility: "collapse" }}
      >
    </div> */}

      {Video && CroppedRegion && Frame && (
        <div className="flex flex-col items-center gap-y-4">
          <button
            onClick={() => setGenerate("Generating...")}
            disabled={Video && CroppedRegion ? false : true}
            className={`${
              Video && CroppedRegion
                ? "pointer-events-auto fill-zinc-900 stroke-zinc-300"
                : "pointer-events-none !text-zinc-300 fill-zinc-300 stroke-zinc-300"
            } select-none rounded-md border text-gray-100 border-gray-800 bg-zinc-900 flex items-center justify-center py-4 px-12 shadow-md hover:shadow-xl transition-all duration-200 active:shadow-sm`}
          >
            <label className="relative w-full flex items-center gap-x-2 cursor-pointer">
              <span
                className={`font-semibold ${
                  Generate == "Generating..." ? "animate-pulse" : ""
                }`}
              >
                {Generate == "Generating..."
                  ? "Generating... " + uploadProgress
                  : Generate}
              </span>
            </label>
          </button>
          {Frame && (
            <label
              htmlFor="upload"
              onClick={() => {
                setUploadStatus("Please upload a video");
                setVideo(null);
                setFrame(null);
                setHide(false);
                if (document.getElementById("upload")) {
                  document?.getElementById("upload")?.click();
                  (
                    document.getElementById("upload") as HTMLInputElement
                  ).value = "";
                }
              }}
              className="uppercase underline text-zinc-900 font-semibold"
            >
              Upload a different video
            </label>
          )}
        </div>
      )}
      <VideoUploadButton
        Uploaded={UploadStatus}
        setVideo={setVideo}
        Hide={Hide}
      />
    </div>
  );
}
