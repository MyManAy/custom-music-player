import express from "express";
import { Spotify } from "spotifydl-core";
import fs from "fs";
import { path as ffmpegPath } from "@ffmpeg-installer/ffmpeg";
import ffmpeg from "fluent-ffmpeg";
import cors from "cors";
ffmpeg.setFfmpegPath(ffmpegPath);

const credentials = {
  clientId: "bf48614d72f24549881ec3aca5ac064c",
  clientSecret: "6064b32d56a24b39a74fe36e9a4a5866",
};
const spotify = new Spotify(credentials);

const songsFolderPath = "../client/public/songs";

const fileExists = (trackId) =>
  fs.existsSync(`${songsFolderPath}/${trackId}.mp3`);

const download = async (trackId) => {
  if (fileExists) return;
  const song = await spotify.downloadTrack(trackId); // Downloading goes brr brr
  fs.writeFileSync(`${songsFolderPath}/${trackId}.mp3`, song);
};

const app = express();

app.use(cors());

app.get("/getSavedIds", async (req, res) => {
  const files = fs.readdirSync(songsFolderPath);
  res.send(files.map((fileName) => fileName.replace(".mp3", "")));
});

app.all("/:id", async (req, res) => {
  try {
    await download(req.params.id);
  } catch {
    console.log("weird err");
  } finally {
    res.send("OK");
  }
});

app.listen(9999, () => {
  console.log("Download app on http://localhost:9999");
});
