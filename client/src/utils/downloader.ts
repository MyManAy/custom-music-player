import { Spotify } from "spotifydl-core";
import fs from "fs";
import { path as ffmpegPath } from "@ffmpeg-installer/ffmpeg";
import ffmpeg from "fluent-ffmpeg";
ffmpeg.setFfmpegPath(ffmpegPath);

const credentials = {
  clientId: "bf48614d72f24549881ec3aca5ac064c",
  clientSecret: "6064b32d56a24b39a74fe36e9a4a5866",
};
const spotify = new Spotify(credentials);

const download = async (trackId: string) => {
  const song = await spotify.downloadTrack(trackId); // Downloading goes brr brr
  fs.writeFileSync("../assets", song);
};
