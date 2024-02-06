// type Props = {};

// import { FFmpeg } from "@ffmpeg/ffmpeg";
// import { fetchFile } from "@ffmpeg/util";
// import { useRef, useState } from "react";

// export default function Video({}: Props) {
//   const [loaded, setLoaded] = useState(false);
//   const ffmpegRef = useRef(new FFmpeg());
//   const messageRef = useRef<any>(null);

//   const load = async () => {
//     const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
//     const ffmpeg = ffmpegRef.current;
//     ffmpeg.on("log", ({ message }) => {
//       messageRef.current.innerHTML = message;
//       console.log(message);
//     });
//     await ffmpeg.load({
//       coreURL: `${baseURL}/ffmpeg-core.js`, // Adjust the path to ffmpeg-core.js accordingly

//       //   wasmURL: `${baseURL}/ffmpeg-core.wasm`, // Adjust the path to ffmpeg-core.wasm accordingly
//     });
//     setLoaded(true);
//   };

//   const extractFrames = async () => {
//     const ffmpeg = ffmpegRef.current;
//     await ffmpeg.writeFile("input.mp4", await fetchFile("/Video_Sample.mp4")); // Adjust the path to your video accordingly
//     const totalFrames = await getVideoTotalFrames(ffmpeg, "/Video_Sample.mp4");
//     const frameRate = Math.ceil(totalFrames / 48);
//     await ffmpeg.exec([
//       "-i",
//       "input.mp4",
//       "-vf",
//       `fps=${frameRate}`, // Extract one frame per second
//       "-vsync",
//       "vfr",
//       "output_%03d.png", // Output frame filenames (e.g., output_001.png, output_002.png, ...)
//     ]);
//     messageRef.current.innerHTML = "Frames extracted successfully.";
//   };

//   const getVideoTotalFrames = async (ffmpeg: any, videoPath: any) => {
//     const result = await ffmpeg.run("-i", videoPath);
//     const match = result.match(/Duration: (\d+):(\d+):(\d+)/);
//     if (match) {
//       const hours = parseInt(match[1]);
//       const minutes = parseInt(match[2]);
//       const seconds = parseInt(match[3]);
//       const totalSeconds = hours * 3600 + minutes * 60 + seconds;
//       const frameRate = await getVideoFrameRate(ffmpeg, videoPath);
//       return totalSeconds * frameRate; // Total frames = total seconds * frame rate
//     }
//     return 0;
//   };

//   // Function to get the frame rate of the video
//   const getVideoFrameRate = async (ffmpeg: any, videoPath: any) => {
//     const result = await ffmpeg.run("-i", videoPath);
//     const match = result.match(/(\d+(?:\.\d+)?) fps/);
//     if (match) {
//       return parseFloat(match[1]);
//     }
//     return 0;
//   };

//   return loaded ? (
//     <>
//       <button onClick={extractFrames}>Extract Frames</button>
//       <p ref={messageRef}></p>
//     </>
//   ) : (
//     <button onClick={load}>Load FFmpeg (~31 MB)</button>
//   );
// }
