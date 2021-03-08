import AudioPlayer from 'material-ui-audio-player';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const src = [
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
];

const useStyles = makeStyles((theme) => {
  return {
    root: {
        display: 'flex',
        zIndex: theme.zIndex.drawer + 2,
        bottom: 0,
        position: 'fixed',
        height: 100,
        justifyItems: 'center',
        padding: 10
    },
    loopIcon: {
      color: '#3f51b5',
      '&.selected': {
        color: '#0921a9',
      },
      '&:hover': {
        color: '#7986cb',
      },
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    playIcon: {
      color: '#f50057',
      '&:hover': {
        color: '#ff4081',
      },
    },
    replayIcon: {
      color: '#e6e600',
    },
    pauseIcon: {
      color: '#0099ff',
    },
    volumeIcon: {
      color: 'rgba(0, 0, 0, 0.54)',
    },
    volumeSlider: {
      color: 'black',
    },
    progressTime: {
      color: 'rgba(0, 0, 0, 0.54)',
    },
    mainSlider: {
      color: '#3f51b5',
      '& .MuiSlider-rail': {
        color: '#7986cb',
      },
      '& .MuiSlider-track': {
        color: '#3f51b5',
      },
      '& .MuiSlider-thumb': {
        color: '#303f9f',
      },
    },
  };
});

export default function Player() {
    const classes = useStyles();

return (
    <Container className={classes.root}>
      <h1>Hell Year</h1>
      <AudioPlayer
        width="100vw"
        useStyles={useStyles}
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
      />
    </Container>
)};