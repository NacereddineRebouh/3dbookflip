"use client";
import { delay, motion } from "framer-motion";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

type Props = {
  setVideo: Dispatch<SetStateAction<File | null>>;
  Uploaded: boolean | null;
  uploadProgress: number;
};

export default function VideUploadButton({
  uploadProgress,
  setVideo,
  Uploaded = null,
}: Props) {
  const [uploadStatus, setUploadStatus] = useState("");
  useEffect(() => {
    if (Uploaded) {
      setUploadStatus("Upload Complete");
    } else if (Uploaded == null) {
      setUploadStatus("Upload file");
    } else if (Uploaded == false) {
      setUploadStatus("Uploading...");
    }
  }, [Uploaded]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];

      if (selectedFile) {
        setVideo(selectedFile);
        // Simulating upload process (replace with your actual upload logic)
        setUploadStatus("Uploading...");
      }
    }
  };

  return (
    <motion.div
      animate={{ opacity: 1, transition: { delay: 5 } }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      className="z-40 flex items-end p-32 justify-center"
    >
      <div className="rounded-md border border-gray-100 bg-white p-4 shadow-md">
        <label
          htmlFor="upload"
          className="flex flex-col items-center gap-2 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 fill-white stroke-indigo-500"
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
            {uploadStatus || "Upload file"}
            {uploadStatus == "Uploading..." ? " " + uploadProgress : ""}
          </span>
        </label>
        <input
          accept="video/mp4"
          id="upload"
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </motion.div>
  );
}
