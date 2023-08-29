import { createTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

//const LIST = ["#5cdb95", "#05386B", "#379683", "#8EE4AF", "#EDF5E1"];

const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: '"Cairo", sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
  palette: {
    primary: {
      main: "#5cdb95",
    },
    secondary: {
      main: "#05386B",
    },
    error: {
      main: red.A400,
    },
    success: {
      main: "#00962a",
    },
    background: {
      default: "#F1F1F1",
    },
  },
});

export default theme;
