import { Box, Slider, Typography, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import { msToMinsAndSecs } from "~/utils/msToMinsAndSecs";

interface IAppProps {
  secs: number;
  length: number;
  onChange: (secs: number) => void;
}

const TinyText = styled(Typography)({
  fontSize: "0.75rem",
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

const MusicSlider = ({ secs, length, onChange }: IAppProps) => {
  const [position, setPosition] = useState(secs);

  return (
    <Box sx={{ width: "40%" }}>
      <Slider
        aria-label="time-indicator"
        size="small"
        value={secs}
        min={0}
        step={1}
        max={length}
        onChange={(_, value) => {
          setPosition(value as number);
        }}
        onMouseUp={() => onChange(position)}
        sx={{
          color: "rgba(0,0,0,0.87)",
          height: 4,
          "& .MuiSlider-thumb": {
            width: 8,
            height: 8,
            transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
            "&:before": {
              boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
            },
            "&:hover, &.Mui-focusVisible": {
              boxShadow: `0px 0px 0px 8px rgb(0 0 0 / 16%)`,
            },
            "&.Mui-active": {
              width: 20,
              height: 20,
            },
          },
          "& .MuiSlider-rail": {
            opacity: 0.28,
          },
        }}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mt: -2,
        }}
      >
        <TinyText>{msToMinsAndSecs(secs * 1000)}</TinyText>
        <TinyText>-{msToMinsAndSecs((length - secs) * 1000)}</TinyText>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: -1,
        }}
      ></Box>
    </Box>
  );
};

export default MusicSlider;
