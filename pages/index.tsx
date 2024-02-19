"use client";
import { Montserrat } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import VideoUploadButton from "@/components/VideoUploadButton";
import dynamic from "next/dynamic";
import logo from "@/public/whatheflip.svg";
import Image from "next/image";
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

  return (
    <main
      className={`flex bg-zinc-50 h-full flex-col min-h-screen pb-10 md:py-20 items-center justify-start mx-auto max-w-[2100px] p-0 ${mont.className}`}
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
      <Image src={logo} width={300} height={100} alt={"Logo"} />
      <FrameCropDynamic Video={Video} setVideo={setVideo}></FrameCropDynamic>
    </main>
  );
}
