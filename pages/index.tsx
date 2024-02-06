"use client";
import { Inter } from "next/font/google";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Scene from "@/components/Scene/Scene";
import VideUploadButton from "@/components/VideUploadButton";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [Video, setVideo] = useState<File | null>(null);
  const [Uploaded, setUploaded] = useState<boolean | null>(null);
  return (
    <main className="bg-orange-300 flex h-full min-h-screen min-w-full p-0">
      <VideUploadButton Uploaded={Uploaded} setVideo={setVideo} />
      <Scene Video={Video} setUploaded={setUploaded} />
    </main>
  );
}
