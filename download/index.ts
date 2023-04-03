import { Scraper } from "@yimura/scraper";
import express from "express";
import ytdl from "ytdl-core";
import fs from "fs";
import cors from "cors";
import { Readable } from "stream";

const youtube = new Scraper();
const app = express();

app.use(cors());

const songsFolderPath = "../client/public/songs";

interface SongData {
  name: string;
  artist: string;
  id: string;
}

const fileExists = (trackId: string) =>
  fs.existsSync(`${songsFolderPath}${trackId}.webm`);

const getSearchQuery = (name: string, artist: string) =>
  `${name} ${artist} audio`;

const getSearchResults = async (name: string, artist: string) =>
  youtube.search(getSearchQuery(name, artist));

const getDownloadStream = (link: string) => {
  let d: Readable;
  d = ytdl(link, {
    quality: "highestaudio",
    filter: (format) => format.container === "webm",
  }).on("error", () => {
    d = ytdl(link, {
      quality: "highest",
      filter: (format) => format.container === "webm",
    }).on("error", () => {
      d = ytdl(link, {
        filter: (format) => format.container === "webm",
      });
    });
  });
  return d;
};

const downloadIndividual = async (songData: SongData) => {
  const { id, name, artist } = songData;
  const results = await getSearchResults(name, artist);
  const firstVideo = results.videos[0];
  const { link } = firstVideo;
  getDownloadStream(link).pipe(
    fs.createWriteStream(`${songsFolderPath}/${id}.webm`)
  );
};

const downloadWithLink = (link: string, id: string) => {
  getDownloadStream(link).pipe(
    fs.createWriteStream(`${songsFolderPath}/${id}.webm`)
  );
};

app.get("/getSavedIds", async (req, res) => {
  const files = fs.readdirSync(songsFolderPath);
  res.send(files.map((fileName) => fileName.replace(".webm", "")));
});

app.get("/test", async (req, res) => {
  res.header("Content-Type", "application/json");
  res.status(200).send("OK");
});

app.get("/download", async (req, res) => {
  interface QueryParams extends SongData {
    [key: string]: any;
  }
  const songData = req.query as QueryParams;
  if (fileExists(songData.id))
    return res.status(200).send("already downloaded");
  await downloadIndividual(songData);
  res.status(200).send("OK");
});

app.get("/redownload/:id", async (req, res) => {
  const id = req.params.id;
  const link = req.query.link as string;

  downloadWithLink(link, id);
  res.status(200).send("OK");
});

app.listen(9999, () => {
  console.log("Download app on http://localhost:9999");
});
