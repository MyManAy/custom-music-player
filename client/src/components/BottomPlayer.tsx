import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
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

function BottomPlayer() {
  const [value, setValue] = React.useState(0);

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0, height: "80px" }}
      elevation={3}
    >
      <BottomNavigation showLabels value={value}>
        <BottomIcon Icon={ShuffleRoundedIcon} />
        <BottomIcon Icon={SkipPreviousRoundedIcon} />
        <BottomIcon Icon={PlayCircleOutlineRoundedIcon} />
        <BottomIcon Icon={SkipNextRoundedIcon} />
        <BottomIcon Icon={RepeatRoundedIcon} />
      </BottomNavigation>
    </Paper>
  );
}

export default BottomPlayer;
