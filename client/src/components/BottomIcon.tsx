import { BottomNavigationAction, SvgIconTypeMap } from "@mui/material";

import ShuffleRoundedIcon from "@mui/icons-material/ShuffleRounded";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { ComponentType } from "react";

interface IconProps {
  sx: {
    fontSize: string;
  };
}
interface IAppProps {
  Icon: ComponentType<IconProps>;
}
function BottomIcon({ Icon }: IAppProps) {
  return (
    <BottomNavigationAction
      sx={{ top: "25%" }}
      icon={<Icon sx={{ fontSize: "40px" }} />}
    />
  );
}

export default BottomIcon;
