import BottomNavigation from "@mui/material/BottomNavigation";
import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import PauseCircleOutlineRoundedIcon from "@mui/icons-material/PauseCircleOutlineRounded";
import SkipNextRoundedIcon from "@mui/icons-material/SkipNextRounded";
import SkipPreviousRoundedIcon from "@mui/icons-material/SkipPreviousRounded";
import ShuffleRoundedIcon from "@mui/icons-material/ShuffleRounded";
import ShuffleOnRoundedIcon from "@mui/icons-material/ShuffleOnRounded";
import RepeatRoundedIcon from "@mui/icons-material/RepeatRounded";
import RepeatOnRoundedIcon from "@mui/icons-material/RepeatOnRounded";
import BottomIcon from "./BottomIcon";

export type Action =
  | "shuffle"
  | "forward"
  | "playPause"
  | "previous"
  | "repeat";

export interface IAppProps {
  onClickAny: (action: Action) => void;
  isShuffled?: boolean;
  isPlaying?: boolean;
  isRepeated?: boolean;
}

const Actions = ({
  onClickAny,
  isShuffled,
  isPlaying,
  isRepeated,
}: IAppProps) => {
  return (
    <BottomNavigation sx={{ position: "relative", bottom: "10%" }}>
      <BottomIcon
        Icon={isShuffled ? ShuffleOnRoundedIcon : ShuffleRoundedIcon}
        onClick={() => onClickAny("shuffle")}
      />
      <BottomIcon
        Icon={SkipPreviousRoundedIcon}
        onClick={() => onClickAny("previous")}
      />
      <BottomIcon
        Icon={
          isPlaying
            ? PauseCircleOutlineRoundedIcon
            : PlayCircleOutlineRoundedIcon
        }
        onClick={() => onClickAny("playPause")}
        size="45px"
      />
      <BottomIcon
        Icon={SkipNextRoundedIcon}
        onClick={() => onClickAny("forward")}
      />
      <BottomIcon
        Icon={isRepeated ? RepeatOnRoundedIcon : RepeatRoundedIcon}
        onClick={() => onClickAny("repeat")}
      />
    </BottomNavigation>
  );
};

export default Actions;
