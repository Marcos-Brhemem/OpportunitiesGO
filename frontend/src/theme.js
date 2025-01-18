// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6200ea', // Purple
    },
    secondary: {
      main: '#000000', // Black
    },
    background: {
      default: '#ffffff', // White
      paper: '#ffffff', // White
    },
    text: {
      primary: '#000000', // Black
      secondary: '#000000', // Black
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

export default theme;