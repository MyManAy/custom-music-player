import Paper from "@mui/material/Paper";

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
