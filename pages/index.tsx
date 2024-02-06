"use client";
import { Inter } from "next/font/google";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Scene from "@/components/Scene/Scene";
import VideUploadButton from "@/components/VideUploadButton";
import LoadingScreen from "@/components/LoadingScreen";
import { AnimatePresence } from "framer-motion";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [Video, setVideo] = useState<File | null>(null);
  const [Uploaded, setUploaded] = useState<boolean | null>(null);
  const [percentage, setPercentage] = useState<number>(0);
  const [Loaded, setLoaded] = useState<boolean>(false);
  return (
    <main className="bg-orange-300 flex h-full min-h-screen min-w-full p-0">
      <AnimatePresence mode="wait">
        {!Loaded && (
          <LoadingScreen percentage={percentage} setLoaded={setLoaded} />
        )}
      </AnimatePresence>
      <VideUploadButton Uploaded={Uploaded} setVideo={setVideo} />
      <Scene
        setPercentage={setPercentage}
        Video={Video}
        setUploaded={setUploaded}
      />
    </main>
  );
}
