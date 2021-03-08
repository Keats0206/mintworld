import AudioPlayer from 'material-ui-audio-player';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const src = [
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
];

const useStyles = makeStyles((theme) => ({
        root: {
          [theme.breakpoints.down('sm')]: {
            width: '100%'
          },
        },
        loopIcon: {
          color: '#3f51b5',
          '&.selected': {
            color: '#0921a9'
          },
          '&:hover': {
            color: '#7986cb'
          },
          [theme.breakpoints.down('sm')]: {
            display: 'none'
          }
        },
        playIcon: {
          color: '#f50057',
          '&:hover': {
            color: '#ff4081'
          }
        },
        volumeIcon: {
          color: 'rgba(0, 0, 0, 0.54)'
        },
        volumeSlider: {
          color: 'black'
        },
        progressTime: {
          color: 'rgba(0, 0, 0, 0.54)'
        },
        mainSlider: {
          color: '#3f51b5',
          '& .MuiSlider-rail': {
            color: '#7986cb'
          },
          '& .MuiSlider-track': {
            color: '#3f51b5'
          },
          '& .MuiSlider-thumb': {
            color: '#303f9f'
          }
    }
}));

export default function Player() {
    const classes = useStyles();

return (
    <div className={classes.player}>
        <AudioPlayer
            useStyles={useStyles}
            elevation={1}
            width="500px"
            variation="primary"
            spacing={6}
            debug={false}
            src={src[1]}
        />
    </div>
)};