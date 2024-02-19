"use client";
import { delay, motion } from "framer-motion";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import LoadingSpiner from "@/public/spiner.gif";
import Image from "next/image";
type Props = {
  setVideo: Dispatch<
    SetStateAction<{ video: File | null; width: number; height: number } | null>
  >;
  Uploaded: string;
  Hide: boolean;
};

export default function VideoUploadButton({ setVideo, Uploaded, Hide }: Props) {
  const [uploadStatus, setUploadStatus] = useState("");
  const videoRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    setUploadStatus(Uploaded);
    if (Uploaded == "Generated successfully") {
      setTimeout(() => {
        setUploadStatus("Please upload a video");
        setVideo(null);
        if (videoRef.current) videoRef.current.files = null;
      }, 4000);
    }
  }, [Uploaded, Hide]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      const url = URL.createObjectURL(selectedFile);
      const video = document.createElement("video");
      video.src = url;
      console.log("Uploaded:", selectedFile);
      video.addEventListener("loadedmetadata", function () {
        console.log("width:", this.videoWidth);
        console.log("height:", this.videoHeight);
        if (selectedFile) {
          setVideo({
            video: selectedFile,
            width: this.videoWidth,
            height: this.videoHeight,
          });
          setUploadStatus("Uploading...");
        }
      });
    }
  };

  return (
    <motion.label
      animate={{ opacity: 1, transition: { delay: 1 } }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      htmlFor="upload"
      className={`${
        Hide ? "hidden" : "flex"
      } border-[2px] border-zinc-700 border-dashed aspect-video flex-col sm:gap-y-4 items-center justify-center w-[80%] md:w-[60%] sm:text-lg text-center md:text-xl font-semibold italic drop-shadow-lg z-50 cursor-pointer `}
    >
      {uploadStatus == "Uploading..." ? (
        <Image
          src={LoadingSpiner}
          className="grayscale brightness-0"
          height={40}
          width={40}
          alt={""}
        />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 fill-white stroke-zinc-700"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      )}
      {uploadStatus == "Upload a video" ||
      uploadStatus == "Please upload a video"
        ? "Please upload a video"
        : uploadStatus}
      <input
        ref={videoRef}
        accept="video/*"
        id="upload"
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />
    </motion.label>
  );
}
