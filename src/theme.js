import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'IBM Plex Sans KR, sans-serif',
  },
  palette: {
    primary: {
      main: '#035036',
      light: '#AFC6AA', // 원하는 색상 코드로 변경
    },
    secondary: {
      main: '#AFC6AA',
    },
  },
});

export default theme;

// light : #BBCFB7, #AFC6AA,
// Pre-Footer color:  #C7D6C3
