import {
  Avatar,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ThemeProvider,
} from "@mui/material";
import Headers from "./Headers";
import Spinner from "./Spinner";
import { msToMinsAndSecs } from "~/utils/msToMinsAndSecs";
import { useState } from "react";
import materialTheme from "~/utils/materialTheme";

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
  onRowClick: (id: string) => void;
  currentlyPlayingSongId?: Song["id"];
}

const headers = ["Cover", "Title", "Artist", "Album", "Date Added", "Length"];

export default function BasicTable({
  songs,
  onRowClick,
  currentlyPlayingSongId,
}: IAppProps) {
  const [clickedId, setClickedId] = useState(null as null | string);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <Headers headers={headers}></Headers>
          </TableRow>
        </TableHead>
        <TableBody>
          {songs.map((song, index) => (
            <ThemeProvider theme={materialTheme} key={index}>
              <TableRow
                onClick={() => onRowClick(song.id)}
                onMouseDown={() => {
                  setClickedId(song.id);
                }}
                onMouseUp={() => {
                  setClickedId(null);
                }}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": {
                    backgroundColor:
                      clickedId === song.id ? "white" : "#f5f5f5",
                  },
                  backgroundColor:
                    currentlyPlayingSongId === song.id ? "#E7FFE6" : "white",
                }}
              >
                <TableCell component="th" scope="row">
                  {song.cover ? (
                    <Avatar
                      src={song.cover.toString()}
                      sx={{
                        height: "50px",
                        width: "50px",
                      }}
                      variant="square"
                    ></Avatar>
                  ) : (
                    "NO IMG"
                  )}
                </TableCell>
                <TableCell align="left" sx={{ fontSize: "20px" }}>
                  {song.title}
                </TableCell>
                <TableCell align="left">{song.artist}</TableCell>
                <TableCell align="left">{song.album}</TableCell>
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
            </ThemeProvider>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
