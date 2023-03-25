import { Button } from "@mui/material";

export default function App() {
  return (
    <div>
      <h1>{"You're signed in!"}</h1>
      <Button
        variant="outlined"
        size="large"
        onClick={() => {
          console.log("smth");
        }}
        sx={{ borderColor: "#1DB954", color: "#1DB954" }}
      >
        Logout
      </Button>
    </div>
  );
}
