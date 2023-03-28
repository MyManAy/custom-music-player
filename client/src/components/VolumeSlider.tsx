import { Slider, Stack } from "@mui/material";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { useState } from "react";

export interface IAppProps {
  onChange: (volume: number) => void;
}

const VolumeSlider = ({ onChange }: IAppProps) => {
  const [volume, setVolume] = useState<number>(100);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setVolume(newValue as number);
    onChange(newValue as number);
  };
  return (
    <div
      style={{
        position: "relative",
        bottom: "110.5%",
        left: "90%",
        width: "9%",
      }}
    >
      <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
        <VolumeDownIcon />
        <Slider
          size="medium"
          sx={{
            color: "black",
            "& .MuiSlider-thumb": {
              width: 14,
              height: 14,
              backgroundColor: "#fff",
              "&:before": {
                boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
              },
              "&:hover, &.Mui-focusVisible, &.Mui-active": {
                boxShadow: "none",
              },
            },
          }}
          aria-label="Volume"
          value={volume}
          onChange={handleChange}
        />
        <VolumeUpIcon />
      </Stack>
    </div>
  );
};

export default VolumeSlider;
