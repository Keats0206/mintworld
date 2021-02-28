import MainAppBar from './MainAppBar.js';
import NftGrid from './NftGrid.js';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
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
        <CssBaseline />
        <MainAppBar />
        <NftGrid />
   </ThemeProvider>
  );
}

export default App;
