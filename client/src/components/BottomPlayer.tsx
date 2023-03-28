import Paper from "@mui/material/Paper";
import SongDisplay, { type SelectedSongDisplay } from "./SongDisplay";
import VolumeSlider from "./VolumeSlider";
interface IAppProps {
  children?: React.ReactNode;
  selectedSongDisplay?: SelectedSongDisplay;
  onVolumeChange: (volume: number) => void;
}

function BottomPlayer({
  children,
  selectedSongDisplay,
  onVolumeChange,
}: IAppProps) {
  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "100px",
        overflow: "hidden",
      }}
      elevation={3}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          bottom: "10%",
          position: "relative",
        }}
      >
        {children}
      </div>
      {selectedSongDisplay ? (
        <>
          {" "}
          <SongDisplay selectedSongDisplay={selectedSongDisplay} />
          <VolumeSlider onChange={onVolumeChange} />
        </>
      ) : (
        <></>
      )}
    </Paper>
  );
}

export default BottomPlayer;
