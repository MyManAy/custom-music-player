import { Button } from "@mui/material";

interface IAppProps {
  port: number;
}

export default function App({ port }: IAppProps) {
  return (
    <div>
      <h1>{"Sign in to start copying!"}</h1>
      <Button
        variant="contained"
        size="large"
        href={`http://localhost:8888/login?port=${port}`}
        sx={{ backgroundColor: "#1DB954" }}
      >
        Login to Spotify
      </Button>
    </div>
  );
}
