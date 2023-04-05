import {
  Avatar,
  Button,
  TableCell,
  TableRow,
  ThemeProvider,
} from "@mui/material";
import materialTheme from "~/utils/materialTheme";
import type { Song } from "./BasicTable";
import { msToMinsAndSecs } from "~/utils/msToMinsAndSecs";
import Spinner from "./Spinner";
import VideoSettingsRoundedIcon from "@mui/icons-material/VideoSettingsRounded";
import ReDownload from "./ReDownload";

interface IAppProps {
  song: Song;
  onRowClick: (id: string) => void;
  onMouseDown: () => void;
  onMouseUp: () => void;
  currentlyPlayingSongId?: Song["id"];
  clickedId: Song["id"] | null;
}

const SongRow = ({
  song,
  onRowClick,
  onMouseDown,
  onMouseUp,
  clickedId,
  currentlyPlayingSongId,
}: IAppProps) => {
  const interactiveProps = {
    onClick: () => onRowClick(song.id),
    onMouseDown: onMouseDown,
    onMouseUp: onMouseUp,
  };

  return (
    <ThemeProvider theme={materialTheme}>
      <TableRow
        sx={{
          "&:last-child td, &:last-child th": { border: 0 },
          "&:hover": {
            backgroundColor: clickedId === song.id ? "white" : "#f5f5f5",
          },
          backgroundColor:
            currentlyPlayingSongId === song.id ? "#E7FFE6" : "white",
        }}
      >
        <TableCell component="th" scope="row" {...interactiveProps}>
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
        <TableCell align="left" sx={{ fontSize: "20px" }} {...interactiveProps}>
          {song.title}
        </TableCell>
        <TableCell align="left" {...interactiveProps}>
          {song.artist}
        </TableCell>
        <TableCell align="left" {...interactiveProps}>
          {song.album}
        </TableCell>
        <TableCell align="right" {...interactiveProps}>
          {song.dateAdded.toLocaleDateString()}
        </TableCell>
        <TableCell align="right" {...interactiveProps}>
          {msToMinsAndSecs(song.length_ms)}
        </TableCell>
        <TableCell align="center" padding="none">
          {song.mp3Loaded ? (
            <ReDownload
              id={song.id}
              trigger={
                <Button>
                  <VideoSettingsRoundedIcon
                    sx={{
                      height: "30px",
                      width: "30px",
                      color: "gray",
                    }}
                  />
                </Button>
              }
            />
          ) : (
            <Spinner />
          )}
        </TableCell>
      </TableRow>
    </ThemeProvider>
  );
};

export default SongRow;
