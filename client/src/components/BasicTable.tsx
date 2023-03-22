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
import Headers from "./Headers";
import Spinner from "./Spinner";

export interface Song {
  cover: URL | null;
  title: string;
  artist: string;
  album: string;
  dateAdded: Date;
  length_ms: number;
  mp3Loaded: boolean;
  id: string;
}

export interface IAppProps {
  songs: Song[];
}

const msToMinsAndSecs = (ms: number) => {
  const secs = ms / 1000;
  const mins = Math.floor(secs / 60);
  const leftOverSecs = Math.floor(secs - mins * 60);
  return `${mins}:${leftOverSecs.toString().padStart(2, "0")}`;
};

const headers = ["Cover", "Title", "Artist", "Album", "Date Added", "Length"];

export default function BasicTable({ songs }: IAppProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <Headers headers={headers}></Headers>
          </TableRow>
        </TableHead>
        <TableBody>
          {songs.map((song) => (
            <TableRow
              key={song.id}
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
              <TableCell align="right">
                {msToMinsAndSecs(song.length_ms)}
              </TableCell>
              {song.mp3Loaded ? (
                <></>
              ) : (
                <TableCell>
                  <Spinner />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
