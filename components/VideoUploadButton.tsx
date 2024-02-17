"use client";
import { delay, motion } from "framer-motion";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

type Props = {
  setVideo: Dispatch<
    SetStateAction<{ video: File | null; width: number; height: number } | null>
  >;
  Uploaded: string;
  uploadProgress: number;
};

export default function VideoUploadButton({
  uploadProgress,
  setVideo,
  Uploaded,
}: Props) {
  const [uploadStatus, setUploadStatus] = useState("");
  const videoRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    setUploadStatus(Uploaded);
    if (Uploaded == "Generated successfully") {
      setTimeout(() => {
        setUploadStatus("Upload a video");
        setVideo(null);
        if (videoRef.current) videoRef.current.files = null;
      }, 4000);
    }
  }, [Uploaded]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    if (event.target.files) {
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
          setUploadStatus("Your video is ready");
        }
      });
    }
  };

  return (
    <motion.div
      animate={{ opacity: 1, transition: { delay: 1 } }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      className="z-40 flex items-end justify-center p-4"
    >
      <div className="rounded-md border border-gray-100 bg-white p-4 shadow-md">
        <label
          htmlFor="upload"
          className="flex flex-col items-center gap-2 cursor-pointer"
        >
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
          <span className="text-gray-600 font-medium">
            {uploadStatus == "Uploading..."
              ? uploadProgress == 100
                ? "Generating Frames..."
                : uploadStatus + " " + uploadProgress
              : uploadStatus}
          </span>
        </label>
        <input
          ref={videoRef}
          accept="video/*"
          id="upload"
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </motion.div>
  );
}
