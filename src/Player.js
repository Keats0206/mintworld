import AudioPlayer from 'material-ui-audio-player';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';



const src = [
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
];

const useStyles = makeStyles((theme) => ({
        root: {
          zIndex: theme.zIndex.drawer + 2,
          width: '100vw',
          position: 'fixed',
          bottom: 0,
          marginInline: 0
    },
    player: {
      width: '100vw'
    }
}));

export default function Player() {
    const classes = useStyles();

return (
      <Container className={classes.root}>
        <AudioPlayer
          elevation={1}
          width="100vw"
          variation="default"
          spacing={3}
          autoplay={true}
          order="standart"
          preload="auto"
          src={src}
        />
      </Container>
)};