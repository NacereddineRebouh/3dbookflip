import { NextApiRequest, NextApiResponse } from "next";
import ytdl from "ytdl-core";
import { YoutubeTranscript } from "youtube-transcript";
import fsSync, {
  createWriteStream,
  writeFileSync,
  promises as fs,
  readFileSync,
  readdir,
  readdirSync,
} from "fs";
import path from "path";
import busboy from "busboy";
import url from "url";
import ffmpeg from "fluent-ffmpeg";
import { createReadStream } from "fs";
import { Readable } from "stream";

const videoDir = "videos/screens";
// folder: "../../../../../public/screens",
console.log("__dirname ", __dirname);
console.log("__filename", __filename);
// // Make sure the video directory exists

// if (!fsSync.existsSync(videoDir)) {
//   console.log("Creating new dir:");
//   fsSync.mkdirSync(videoDir, 0o777);
// } else {
//   console.log("dir Exists");
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
    return CallPost(req, res);
  } else {
    return res.status(500).json({ error: `Method d${method} is not allowed` });
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

async function CallPost(req: NextApiRequest, res: NextApiResponse) {
  let filePath = "";
  const bb = busboy({ headers: req.headers });
  console.log("file", req.body);

  bb.on("file", (_, file, info) => {
    // auth-api.mp4
    const fileName = info.filename;
    console.log("fileName:", fileName);

    // filePath = path.join(process.cwd(), "pages", "staticAssets", fileName);
    // filePath = path.join(videoDir, fileName);
    filePath = path.join("/tmp", fileName);
    // const filePath2 = path.join("/tmp", fileName);
    // filePath = `./${fileName}`;
    // const filePath2 = `./${fileName}`;
    let writeStream = createWriteStream(filePath);
    file.pipe(writeStream);
    writeStream.on("finish", async function () {
      //once the doc stream is completed, read the file from the tmp folder
      const files = readdirSync(__dirname);
      console.log("files:", files);
      const fileContent = readFileSync(filePath);
      // const b = fileContent.buffer;
      // const stream = Readable.from(fileContent);
      // const fileStream = new Readable();
      // fileStream.push(file);
      const filePath3 = `/tmp/${fileName}`; // Adjust the path
      const filePath2 = createReadStream(filePath); // Adjust the path
      // writeFileSync(filePath, fileContent);

      console.log("checking if file is saved 0.6", fileContent);
      console.log("checking if file is saved createReadStream", filePath2.path);
      try {
        console.log("1:", fileName);
        ffmpeg(filePath)
          .on("end", function () {
            console.log("Screenshots taken");
            res.status(200).json({
              message: "Screenshots Taken",
            });
          })
          .screenshots({
            // Will take screens at 20%, 40%, 60% and 80% of the video
            timestamps: [1, 1.5, 2, 3, 3.2, 3.6, 3.9, 5],
            // count: 48,
            filename: "Pages_%00i.jpeg",
            folder: "/tmp",
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
    //create the params for the aws s3 bucket

    // const stream = fsSync.createWriteStream(filePath);
    console.log("0", filePath);
    const files = readdirSync(__dirname);
    console.log("files:", files);
    console.log("0.5", __dirname);
    // file.pipe(stream).on("finish", () => {

    // });
  });

  // bb.on("close", () => {

  //   res.writeHead(200, { Connection: "close" });
  //   res.end(`That's the end`);
  // });

  req.pipe(bb);
}
