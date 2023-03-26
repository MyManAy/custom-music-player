import express from "express";
import { Spotify } from "spotifydl-core";
import fs from "fs";
import { path as ffmpegPath } from "@ffmpeg-installer/ffmpeg";
import ffmpeg from "fluent-ffmpeg";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

ffmpeg.setFfmpegPath(ffmpegPath);

const credentials = {
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
};
const spotify = new Spotify(credentials);

const songsFolderPath = "../client/public/songs";

const fileExists = (trackId) =>
  fs.existsSync(`${songsFolderPath}/${trackId}.mp3`);

const download = async (trackId) => {
  if (fileExists(trackId)) return;
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

const port = 9999;

const baseDownloadUrl = `http://localhost:${port}`;

app.listen(port, () => {
  console.log(`Download app on ${baseDownloadUrl}`);
});
