import { NextApiRequest, NextApiResponse } from "next";
import ytdl from "ytdl-core";
import { YoutubeTranscript } from "youtube-transcript";
import fsSync, { createWriteStream, promises as fs } from "fs";
import path from "path";
import busboy from "busboy";
import url from "url";
import ffmpeg from "fluent-ffmpeg";
import { createReadStream } from "fs";

const videoDir = "videos";

// // Make sure the video directory exists
// if (!fsSync.existsSync(videoDir)) {
//   console.log("Created new dir:");
//   fsSync.mkdirSync(videoDir);
//   fsSync.chmodSync(videoDir, 0o777);
// }

export const config = {
  api: {
    bodyParser: false,
  },
};
// export const config = {
//   api: {
//     bodyParser: {
//       sizeLimit: "900mb",
//     },
//   },
// };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;

  if (method === "POST") {
    let filePath = "";
    const bb = busboy({ headers: req.headers });
    console.log("file", req.body);

    bb.on("file", (_, file, info) => {
      // auth-api.mp4
      const fileName = info.filename;
      console.log("fileName:", fileName);
      filePath = path.join(videoDir, fileName);
      // filePath = `./${fileName}`;
      const filePath2 = `./${fileName}`;

      const stream = fsSync.createWriteStream(filePath);
      console.log("0", filePath);
      console.log("0.5", __dirname);
      file.pipe(stream).on("finish", () => {
        try {
          console.log("1:", filePath);
          ffmpeg(filePath)
            .on("end", function () {
              console.log("Screenshots taken");
              res.status(200).json({
                message: "Screenshots Taken",
              });
            })
            .screenshots({
              // Will take screens at 20%, 40%, 60% and 80% of the video
              count: 48,
              filename: "Pages_%00i.jpeg",
              folder: "./public/screens",
            });
        } catch (error) {
          console.error(error);
          res
            .status(500)
            .send(
              "An error occurred while downloading the video and transcript."
            );
        }
      });
    });

    // bb.on("close", () => {

    //   res.writeHead(200, { Connection: "close" });
    //   res.end(`That's the end`);
    // });

    req.pipe(bb);
  } else {
    return res.status(500).json({ error: `Method ${method} is not allowed` });
  }

  // try {
  //   ffmpeg(filePath)
  //     .on("end", function () {
  //       console.log("Screenshots taken");
  //       res.status(200).json({
  //         message: "Screenshots Taken",
  //       });
  //     })
  //     .screenshots({
  //       // Will take screens at 20%, 40%, 60% and 80% of the video
  //       count: 48,
  //       filename: "Pages_%00i.jpeg",
  //       folder: "./public/screens",
  //     });
  // } catch (error) {
  //   console.error(error);
  //   res
  //     .status(500)
  //     .send("An error occurred while downloading the video and transcript.");
  // }

  // bb.on("close", () => {
  //   res.writeHead(200, { Connection: "close" });
  //   res.end(`That's the end`);
  // });

  // const { video } = req.body;
  // console.log(req.body);
  // if (!video) {
  //   res.status(500).send("a Video must be provided");
  //   return;
  // }
  // const vv = await video.arrayBuffer();
  // console.log(vv);
  // // const v = Buffer.from();
  // // if (typeof videoId !== "string" && typeof videoUrl !== "string") {
  // //   res.status(400).send("Either video ID or video URL must be provided");
  // //   return;
  // // }
  // const fileExtension = getFileExtension(video.name);
  // const name = `temp-video${fileExtension}`;
  // const tempFilePath = path.join("/videos", name);
  // fsSync.writeFileSync(tempFilePath, v);
}

function getFileExtension(fileName: string): string {
  const extensionMatch = fileName.match(/\.[0-9a-z]+$/i);
  return extensionMatch ? extensionMatch[0] : "";
}
