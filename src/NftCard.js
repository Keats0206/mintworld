import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SendIcon from '@material-ui/icons/Send';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import makeBlockie from "ethereum-blockies-base64"; // Ethereum avatar

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
  },
  media: {
    paddingTop: '56.25%', // 16:9
  },
  send: {
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function NftCard({
  userImage,
  userAddress, 
  assetMedia,
  assetName,
  assetDescription,
  assetId,
  mimeType
}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar} src={makeBlockie(userAddress)}>
            R
          </Avatar>
        }
        title={userAddress}
      />
      <div>
      {mimeType.startsWith("image") ? (
                <CardMedia
                  component="img"
                  src={assetMedia}
                  title={assetName}
                />  
                ) : mimeType.startsWith("text") ? (
                // If content-type === text, inject text
                  <h1>No image</h1>
                ) : mimeType.startsWith("audio") ? (
                // If content-type === audio, return audio component
                <CardMedia
                  component="audio"
                  src={assetMedia}
                  title={assetName}
                /> 
                ) : mimeType.startsWith("video") ? (
                // Else, if nothing else, return video component
                <CardMedia
                  component="video"
                  src={assetMedia}
                  title={assetName}
                /> 
                ) : mimeType === "" ? (
                // If no media is uploaded (useful for /create)
                <span>
                    No media uploaded.
                </span>
                ) : (
                // Else, if unsupported mimeType
                <span>
                    Unsupported file type ({mimeType}). <br />
                    <a href={assetMedia} target="_blank" rel="noopener noreferrer">
                    Direct link
                    </a>
                    .
                </span>
                )}
      </div>
      <CardContent>
        <Typography variant="h6" color="textPrimary" component="p">
          {assetName}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {assetDescription}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {/* <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton> */}
        <Button
          variant="contained"
          color="primary"
          className={classes.send}
          endIcon={<SendIcon/>}
          href={"https://zora.co/" + userAddress + "/" + assetId}
        >
        Bid
      </Button>
      </CardActions>
    </Card>
  );
}