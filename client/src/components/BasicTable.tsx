import {
  Avatar,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
// import { For, createSignal, mapArray } from "solid-js";

export interface Song {
  cover: URL | null;
  title: string;
  artist: string;
  album: string;
  dateAdded: Date;
  length: number;
  mp3: File | null;
}

const inital: Song[] = [
  {
    cover: null,
    title: "Song 1",
    artist: "Artist 1",
    album: "Album 1",
    dateAdded: new Date(),
    length: 180,
    mp3: null,
  },
  {
    cover: null,
    title: "Song 2",
    artist: "Artist 2",
    album: "Album 2",
    dateAdded: new Date(),
    length: 240,
    mp3: null,
  },
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Cover</TableCell>
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">Artist</TableCell>
            <TableCell align="right">Album</TableCell>
            <TableCell align="right">Date Added</TableCell>
            <TableCell align="right">Length</TableCell>
            <TableCell align="right">MP3</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {inital.map((song, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {song.cover ? (
                  <Avatar src={song.cover.toString()} variant="square"></Avatar>
                ) : (
                  "NO IMG"
                )}
              </TableCell>
              <TableCell align="right">{song.title}</TableCell>
              <TableCell align="right">{song.artist}</TableCell>
              <TableCell align="right">{song.album}</TableCell>
              <TableCell align="right">
                {song.dateAdded.toLocaleDateString()}
              </TableCell>
              <TableCell align="right">{song.length}</TableCell>
              <TableCell align="right">{song.mp3?.name ?? "NO MP3"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
