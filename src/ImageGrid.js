import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import tileData from './tileData';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

export default function ImageGrid() {
  const classes = useStyles();
  onst [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();
  const [posts, setPosts] = useState([]); // Posts array
  const [loading, setLoading] = useState(false); // Button loading state
  const [numPosts, setNumPosts] = useState(null); // Number of loadable posts
  /**
   * Collects initial 12 posts to display
   */ 
 const collectInitialPosts = async () => {
    //IT WORKS!
    // const superrarePosts = await superclient.request(SUPERRARE_CREATIONS_BY_USER);
    // console.log(superrarePosts)
    // Collect all users
    const allUsers = await client.request(ZORA_CREATIONS_BY_USER);
    // Collect number of total posts
    const numPosts = calculateLatestCreation(allUsers);
    let initialPosts = [];
    if (numPosts) {
      // For numPosts ... numPosts - 12
      for (let i = numPosts; i >= numPosts - 11; i--) {
        // Collect post
        const post = await getPostByID(i);
        // Push post to initialPosts
        initialPosts.push(post);
      }
    }
    setPosts([...initialPosts]); // Update new posts
    setNumPosts(numPosts - 12); // Update number of loadable posts count
    console.log(initialPosts)
  };
  /**
   * Collects more posts (12 at a time, unless < 12 remaining posts)
   */
  const collectMore = async () => {
    setLoading(true); // Toggle button loading
    let newPosts = [];
    console.log(Math.max(numPosts - 11, 0), numPosts);
    // For numPosts ... max(numPosts - 12, 0)
    for (let i = numPosts; i >= Math.max(numPosts - 11, 0); i--) {
      // FIXME: hardcoded fix for /dev/null lmao
      if (i !== 2) {
        // Collect post
        const post = await getPostByID(i);
        newPosts.push(post);
      }
    }
    setPosts([...posts, ...newPosts]); // Append newPosts to posts array
    setNumPosts(numPosts - 6); // Update number of loadable posts count
    setLoading(false); // Toggle button loading
  };
  useEffect(collectInitialPosts, []);
  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">December</ListSubheader>
        </GridListTile>
        {tileData.map((tile) => (
          <GridListTile key={tile.img}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              subtitle={<span>by: {tile.author}</span>}
              actionIcon={
                <IconButton aria-label={`info about ${tile.title}`} className={classes.icon}>
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}