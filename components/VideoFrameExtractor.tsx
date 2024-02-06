// import React, { useEffect, useRef, useState } from "react";

// const VideoFrameExtractor: React.FC<{ videoFilePath: string }> = ({
//   videoFilePath,
// }) => {
//   useEffect(() => {
//     const f = async () => {
//       const extractFrames = require("ffmpeg-extract-frames");
//       await extractFrames({
//         input: "/Video_Sample.mp4",
//         output: "./screenshot-%i.jpg",
//         offsets: [1000, 2000, 3500],
//       });
//     };
//   }, []);

//   return (
//     <div>
//       <h2>Extracted Frames</h2>
//       <ul></ul>
//     </div>
//   );
// };

// export default VideoFrameExtractor;
