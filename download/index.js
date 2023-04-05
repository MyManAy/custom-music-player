"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scraper_1 = require("@yimura/scraper");
const express_1 = __importDefault(require("express"));
const ytdl_core_1 = __importDefault(require("ytdl-core"));
const fs_1 = __importDefault(require("fs"));
const cors_1 = __importDefault(require("cors"));
const youtube = new scraper_1.Scraper();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const songsFolderPath = "../client/public/songs";
const fileExists = (trackId) => fs_1.default.existsSync(`${songsFolderPath}/${trackId}.webm`);
const getSearchQuery = (name, artist) => `${name} ${artist} audio`;
const getSearchResults = (name, artist) => __awaiter(void 0, void 0, void 0, function* () { return youtube.search(getSearchQuery(name, artist)); });
const getDownloadStream = (link) => {
    let d;
    d = (0, ytdl_core_1.default)(link, {
        quality: "highestaudio",
        filter: (format) => format.container === "webm",
    }).on("error", () => {
        d = (0, ytdl_core_1.default)(link, {
            quality: "highest",
            filter: (format) => format.container === "webm",
        }).on("error", () => {
            d = (0, ytdl_core_1.default)(link, {
                filter: (format) => format.container === "webm",
            });
        });
    });
    return d;
};
const downloadIndividual = (songData) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name, artist } = songData;
    const results = yield getSearchResults(name, artist);
    const firstVideo = results.videos[0];
    const { link } = firstVideo;
    getDownloadStream(link).pipe(fs_1.default.createWriteStream(`${songsFolderPath}/${id}.webm`));
});
const downloadWithLink = (link, id) => {
    getDownloadStream(link).pipe(fs_1.default.createWriteStream(`${songsFolderPath}/${id}.webm`));
};
app.get("/getSavedIds", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const files = fs_1.default.readdirSync(songsFolderPath);
    res.send(files.map((fileName) => fileName.replace(".webm", "")));
}));
app.get("/test", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.header("Content-Type", "application/json");
    res.status(200).send("OK");
}));
app.get("/download", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songData = req.query;
    if (fileExists(songData.id))
        return res.status(200).send("already downloaded");
    yield downloadIndividual(songData);
    res.status(200).send("OK");
}));
app.get("/redownload/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const link = req.query.link;
    downloadWithLink(link, id);
    res.status(200).send("OK");
}));
app.listen(9999, () => {
    console.log("Download app on http://localhost:9999");
});
