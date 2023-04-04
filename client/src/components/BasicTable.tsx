import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Headers from "./Headers";
import { useState } from "react";
import SongRow from "./SongRow";

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

const headers = [
  "Cover",
  "Title",
  "Artist",
  "Album",
  "Date Added",
  "Length",
  "download",
];

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
            <SongRow
              key={index}
              song={song}
              onRowClick={onRowClick}
              onMouseDown={() => setClickedId(song.id)}
              onMouseUp={() => setClickedId(null)}
              clickedId={clickedId}
              currentlyPlayingSongId={currentlyPlayingSongId}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
