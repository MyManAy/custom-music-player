import { Button } from "@mui/material";

export default function App() {
  return (
    <div>
      <h1>{"Sign in to start copying!"}</h1>
      <Button
        variant="contained"
        size="large"
        href="http://localhost:8888/login"
        sx={{ backgroundColor: "#1DB954" }}
      >
        Login to Spotify
      </Button>
    </div>
  );
}
