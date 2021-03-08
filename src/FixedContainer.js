import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles, useTheme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    stickToBottom: {
        backgroundColor: "#F8F8F8",
        borderTop: "1px solid #E7E7E7",
        textAlign: "center",
        padding: "20px",
        position: "fixed",
        left: "0",
        bottom: "0",
        height: "60px",
        width: "100%",
    },
  }));

export default function FixedContainer() {
    const classes = useStyles();
    
    return (
        <Container fixed>
            <Typography component="div" style={classes.stickToBottom}>
                MUSIC STUFF
            </Typography>
        </Container>
    );
}
