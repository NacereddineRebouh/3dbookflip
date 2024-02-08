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
import { path as ph } from "@ffmpeg-installer/ffmpeg";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
ffmpeg.setFfmpegPath(ph);

export const config = {
  api: {
    bodyParser: false,
  },
};
const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_S3_REGION as string,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY as string,
  },
});
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
    filePath = path.join("/tmp", fileName);
    let writeStream = createWriteStream(filePath);
    file.pipe(writeStream);
    writeStream.on("finish", async function () {
      //once the doc stream is completed, read the file from the tmp folder
      const files = readdirSync(__dirname);
      console.log("files:", files);
      const fileContent = readFileSync(filePath);
      const filePath3 = `/tmp/${fileName}`; // Adjust the path
      const filePath2 = createReadStream(filePath); // Adjust the path
      // writeFileSync(filePath, fileContent);

      console.log("checking if file is saved 0.6", fileContent);
      console.log("checking if file is saved createReadStream", filePath2.path);
      const Files = [];
      try {
        console.log("1:", fileName);
        ffmpeg(filePath)
          .on("end", async function () {
            console.log("Screenshots taken");
            const fileContent = readFileSync("/tmp/Pages_001.jpeg");
            console.log("---Page 001:", fileContent.byteLength);

            const tmpDir = "/tmp"; // Update with your actual temporary directory path
            const files = readdirSync(tmpDir);
            const filteredFiles = files.filter((fileName) =>
              fileName.startsWith("Pages_")
            );
            const fileContents = uploadToS3({ filteredFiles: filteredFiles });
            console.log("Done:", fileContents);
            res
              .status(200)
              .json({ message: "Screenshots Taken", files: fileContents });
          })
          .screenshots({
            // Will take screens at 20%, 40%, 60% and 80% of the video
            timestamps: [1, 1.5, 2, 3, 3.2, 3.6, 3.9, 5],
            // count: 48,
            filename: "Pages_%00i.jpeg",
            folder: "/tmp",
            // folder: "/public/screens",
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

const uploadToS3 = async ({
  filteredFiles = [],
}: {
  filteredFiles: string[];
}) => {
  // Read each file and send it in the response
  const tmpDir = "/tmp";
  const files = await filteredFiles.map(async (fileName) => {
    const filePath = path.join(tmpDir, fileName);
    const fileData = readFileSync(filePath, "utf-8");

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `${fileName}`,
      Body: fileData,
    };

    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    return { fileName };
  });
  return files;
};
// async function CallPost(req: NextApiRequest, res: NextApiResponse) {
//   let filePath = "";
//   const bb = busboy({ headers: req.headers });
//   console.log("file", req.body);

//   bb.on("file", (_, file, info) => {
//     // auth-api.mp4
//     const fileName = info.filename;
//     console.log("fileName:", fileName);

//     // filePath = path.join(process.cwd(), "pages", "staticAssets", fileName);
//     // filePath = path.join(videoDir, fileName);
//     filePath = path.join("/tmp", fileName);
//     // const filePath2 = path.join("/tmp", fileName);
//     // filePath = `./${fileName}`;
//     // const filePath2 = `./${fileName}`;
//     let writeStream = createWriteStream(filePath);
//     file.pipe(writeStream);
//     writeStream.on("finish", async function () {
//       //once the doc stream is completed, read the file from the tmp folder
//       const files = readdirSync(__dirname);
//       console.log("files:", files);
//       const fileContent = readFileSync(filePath);
//       // const b = fileContent.buffer;
//       // const stream = Readable.from(fileContent);
//       // const fileStream = new Readable();
//       // fileStream.push(file);
//       const filePath3 = `/tmp/${fileName}`; // Adjust the path
//       const filePath2 = createReadStream(filePath); // Adjust the path
//       // writeFileSync(filePath, fileContent);

//       console.log("checking if file is saved 0.6", fileContent);
//       console.log("checking if file is saved createReadStream", filePath2.path);
//       const Files = [];
//       try {
//         console.log("1:", fileName);
//         ffmpeg(filePath)
//           .on("end", function () {
//             console.log("Screenshots taken");
//             const fileContent = readFileSync("/tmp/Pages_001.jpeg");
//             console.log("---Page 001:", fileContent.byteLength);

//             const tmpDir = "/tmp"; // Update with your actual temporary directory path
//             const files = readdirSync(tmpDir);
//             const filteredFiles = files.filter((fileName) =>
//               fileName.startsWith("Pages_")
//             );

//             // Read each file and send it in the response
//             const fileContents = filteredFiles.map((fileName) => {
//               const filePath = path.join(tmpDir, fileName);
//               return {
//                 fileName,
//                 content: readFileSync(filePath, "utf-8"), // or use 'binary' if the files are binary
//               };
//             });
//             console.log("---Pages:", fileContents.length);

//             // Send the files in the response
//             res
//               .status(200)
//               .json({ message: "Screenshots Taken", files: fileContents });
//           })
//           .screenshots({
//             // Will take screens at 20%, 40%, 60% and 80% of the video
//             // timestamps: [1, 1.5, 2, 3, 3.2, 3.6, 3.9, 5],
//             count: 48,
//             filename: "Pages_%00i.jpeg",
//             // folder: "/tmp",
//             folder: "public/screens",
//           });
//       } catch (error) {
//         console.error(error);
//         res
//           .status(500)
//           .send(
//             "An error occurred while downloading the video and transcript."
//           );
//       }
//     });
//     //create the params for the aws s3 bucket

//     // const stream = fsSync.createWriteStream(filePath);
//     console.log("0", filePath);
//     const files = readdirSync(__dirname);
//     console.log("files:", files);
//     console.log("0.5", __dirname);
//     // file.pipe(stream).on("finish", () => {

//     // });
//   });

//   // bb.on("close", () => {

//   //   res.writeHead(200, { Connection: "close" });
//   //   res.end(`That's the end`);
//   // });

//   req.pipe(bb);
// }
