import { fetchFile } from "@ffmpeg/util";
import { FFmpeg } from "@ffmpeg/ffmpeg";
function getFileExtension(file_name: string) {
  const regex = /(?:\.([^.]+))?$/; // Matches the last dot and everything after it
  const match = regex.exec(file_name);
  if (match && match[1]) {
    return match[1];
  }
  return ""; // No file extension found
}

function removeFileExtension(file_name: string) {
  const lastDotIndex = file_name.lastIndexOf(".");
  if (lastDotIndex !== -1) {
    return file_name.slice(0, lastDotIndex);
  }
  return file_name; // No file extension found
}

export default async function convert(ffmpeg: FFmpeg): Promise<any> {
  // FFMEG COMMANDS
  console.log("2");

  let ffmpeg_cmd: any = [];
  // 3gp video

  ffmpeg_cmd = ["-i", "test.mp4", "-r", "1", "-ss", "0", "foo12.jpeg"];
  //   ffmpeg_cmd = [
  //     '-i',
  //     input,

  //     '-r',
  //     '1',
  //     '-s',
  //     'WxH',
  //     '-vb',
  //     '400k',
  //     '-acodec',
  //     'aac',
  //     '-strict',
  //     'experimental',
  //     '-ac',
  //     '1',
  //     '-ar',
  //     '8000',
  //     '-ab',
  //     '24k',
  //     output,
  //   ];
  // execute cmd
  await ffmpeg
    .exec(ffmpeg_cmd)
    .then((res) => {
      console.log(res);
    })
    .catch((er) => {
      console.log(er);
    });

  return {};
}
