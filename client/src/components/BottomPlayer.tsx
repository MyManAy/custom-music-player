import BottomNavigation from "@mui/material/BottomNavigation";
import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import PauseCircleOutlineRoundedIcon from "@mui/icons-material/PauseCircleOutlineRounded";
import SkipNextRoundedIcon from "@mui/icons-material/SkipNextRounded";
import SkipPreviousRoundedIcon from "@mui/icons-material/SkipPreviousRounded";
import ShuffleRoundedIcon from "@mui/icons-material/ShuffleRounded";
import ShuffleOnRoundedIcon from "@mui/icons-material/ShuffleOnRounded";
import RepeatRoundedIcon from "@mui/icons-material/RepeatRounded";
import RepeatOnRoundedIcon from "@mui/icons-material/RepeatOnRounded";
import Paper from "@mui/material/Paper";
import BottomIcon from "./BottomIcon";
import MusicSlider from "./MusicSlider";
import Actions from "./Actions";

interface IAppProps {
  children?: React.ReactNode;
}

function BottomPlayer({ children }: IAppProps) {
  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "100px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
      }}
      elevation={3}
    >
      {children}
    </Paper>
  );
}

export default BottomPlayer;
