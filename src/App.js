import Main from './Main.js';
import Player from './Player.js';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: '#010101',
    },
    secondary: {
      main: '#ff00b6',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
        <Player />
        <CssBaseline />
        <Main />
   </ThemeProvider>
  );
}

export default App;
