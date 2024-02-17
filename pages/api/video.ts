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
import ffmpeg from "fluent-ffmpeg";
import { path as ph } from "@ffmpeg-installer/ffmpeg";
import ffprobe from "ffprobe-static";
console.log(ffprobe.path);
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
ffmpeg.setFfmpegPath(ph);
ffmpeg.setFfprobePath(ffprobe.path);

export const config = {
  api: {
    bodyParser: false,
  },
};
const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY as string,
  },
});
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;

  if (method === "POST") {
    CallPost(req, res);
  } else {
    return res.status(500).json({ error: `Method d${method} is not allowed` });
  }
}
async function CallPost(req: NextApiRequest, res: NextApiResponse) {
  let filePath = "";
  console.log("req.body:::", req.headers);
  const bb = busboy({ headers: req.headers });
  bb.setMaxListeners(0).on("file", (_, file, info) => {
    // auth-api.mp4
    const fileName = info.filename;
    console.log("fileName:", fileName);
    console.log("dirname:", __dirname);
    filePath = path.join("/tmp", fileName);
    let writeStream = createWriteStream(filePath);
    file.pipe(writeStream);
    writeStream.setMaxListeners(0).on("finish", async function () {
      //once the doc stream is completed, read the file from the tmp folder
      try {
        console.log("1:", fileName);
        ffmpeg(filePath)
          .on("end", async function () {
            console.log("Screenshots taken");
            const tmpDir = "/tmp"; // Update with your actual temporary directory path
            const files = readdirSync(tmpDir);
            console.log("savefd images in tmp,", files);
            const filteredFiles = files.filter((fileName) =>
              fileName.startsWith("Pages_")
            );
            console.log("Will uploadPromises....", filteredFiles);
            const uploadPromises = filteredFiles.map(async (file) => {
              const filePath = path.join(tmpDir, file);
              console.log("Uplaoding ....", filePath);
              const fileData = readFileSync(filePath);
              const params = {
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: `${file}`,
                Body: fileData,
              };

              const command = new PutObjectCommand(params);
              await s3Client.send(command);
              return { file };
            });
            console.log("await uploadPromises....");

            await Promise.all(uploadPromises)
              .then((v) => {
                console.log("-1.Done:", v);
                res
                  .status(200)
                  .json({ message: "Screenshots Taken", files: v });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({ message: "Upload problem" });
              });
          })
          .setMaxListeners(0)
          .screenshots({
            // Will take screens at 20%, 40%, 60% and 80% of the video
            // timestamps: timestamps,
            count: 48,
            filename: "Pages_%00i.jpeg",
            folder: "/tmp",
            // folder: "public/screens",
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

  req.pipe(bb);
}
