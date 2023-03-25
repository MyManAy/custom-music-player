import { createTheme } from "@mui/material";

export default createTheme({
  components: {
    // Name of the component

    MuiTableRow: {
      defaultProps: {
        hover: false,
      },
    },
  },
});
