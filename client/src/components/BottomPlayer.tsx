import { Avatar } from "@mui/material";
import Paper from "@mui/material/Paper";
import textEllipse from "~/utils/textEllipse";

export interface SelectedSongDisplay {
  imgSrc: string | null;
  title: string;
  artist: string;
}
interface IAppProps {
  children?: React.ReactNode;
  selectedSongDisplay?: SelectedSongDisplay;
}

function BottomPlayer({ children, selectedSongDisplay }: IAppProps) {
  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "100px",
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
            <h1 className="text-ellipsis text-2xl font-semibold text-black">
              {textEllipse(42, selectedSongDisplay.title)}
            </h1>
            <h1 className="text-ellipsis text-xl text-gray-800">
              {selectedSongDisplay.artist}
            </h1>
          </div>
        </div>
      ) : (
        <></>
      )}
    </Paper>
  );
}

export default BottomPlayer;
