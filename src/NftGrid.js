import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import client from "./data/client"; // GraphQL client
import superclient from "./data/superclient"; // GraphQL client
import { getPostByID } from "./data/functions"; // Post collection helper
import { calculateLatestCreation, ZORA_CREATIONS_BY_USER, SUPERRARE_CREATIONS_BY_USER } from "./data/queries"; // queries
import Button from '@material-ui/core/Button';
import NftCard from './NftCard';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: 30,
  },
  paper: {
    height: 600,
    width: 400,
  },
  control: {
    padding: theme.spacing(6),
  },
  loading:{
    justifyContent: "center",
    width: 300,
    margin: 30
  }
}));

export default function NftGrid() {
  const [spacing, setSpacing] = React.useState(2);
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
    <div>
      {posts.length > 0 ? (
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={10}>
              {posts.map((post, id) => (
                <Grid key={id} item>
                  <NftCard 
                      userImage={post.userImage}
                      userAddress={post.creator.id}
                      assetMedia={post.contentURI}
                      assetName={post.metadata.name}
                      assetDescription={post.metadata.description}
                      assetId={post.id}
                      mimeType={post.metadata.mimeType}
                  />
                </Grid>
              ))}
            </Grid>
              <Grid container justify="center" spacing={10}>
                <Button 
                  disabled={loading}
                  className={classes.loading} 
                  variant="contained"
                  color="primary"
                  onClick={() => collectMore()} 
                >
                    {loading ? "Loading..." : "Load More"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
          /* {posts && posts.length > 0 && posts[posts.length - 1].id !== "0" ? (
              // If there remain posts that can be loaded, display button
              <div className={styles.showcase__more}>
                <button onClick={() => collectMore()} disabled={loading}>
                  {loading ? "Loading..." : "Load More"}
                </button>
              </div>
            ) : (
              // Else, display text signalling (end, beginning)
              <div className={styles.showcase__more}>
                <span>Is this the end or beginning? You decide.</span>
              </div>
            )} */
      ) : (
          <div className={classes.loading}>
            <h3>Loading...</h3>
          </div>
        )}
    </div>
  );
}