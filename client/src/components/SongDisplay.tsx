import { Avatar } from "@mui/material";
import textEllipse from "~/utils/textEllipse";

export interface SelectedSongDisplay {
  imgSrc: string | null;
  title: string;
  artist: string;
}

interface IAppProps {
  selectedSongDisplay: SelectedSongDisplay;
}

const SongDisplay = ({ selectedSongDisplay }: IAppProps) => {
  return (
    <div
      style={{
        position: "relative",
        bottom: "81%",
        left: ".8%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "28%",
        gap: "14px",
        whiteSpace: "nowrap",
      }}
    >
      <Avatar
        sx={{ height: "70px", width: "70px" }}
        src={
          selectedSongDisplay.imgSrc ??
          "http://faculty.washington.edu/chudler/gif/afterc.gif"
        }
        variant="square"
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1 className="text-2xl font-semibold text-black">
          {textEllipse(42, selectedSongDisplay.title)}
        </h1>
        <h1 className="text-xl text-gray-800">{selectedSongDisplay.artist}</h1>
      </div>
    </div>
  );
};

export default SongDisplay;
