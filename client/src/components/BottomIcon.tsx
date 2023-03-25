import { BottomNavigationAction } from "@mui/material";
import type { ComponentType } from "react";

interface IconProps {
  sx: {
    fontSize: string;
  };
}
interface IAppProps {
  Icon: ComponentType<IconProps>;
  size?: string;
  onClick: () => void;
}
function BottomIcon({ Icon, onClick, size = "35px" }: IAppProps) {
  return (
    <BottomNavigationAction
      onClick={onClick}
      sx={{ top: "25%" }}
      icon={<Icon sx={{ fontSize: size }} />}
    />
  );
}

export default BottomIcon;
