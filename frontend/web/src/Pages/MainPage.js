import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import {getRandomSongs} from '../Services/DoYouKnowService'
function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


export default class MainPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            cards : [
                {
                    Name : "Song A",
                    song_rating: 3
                },
                {
                    Name : "Song B",
                    song_rating: 2
                },
                {
                    Name : "Song C",
                    song_rating: 5
                },
                {
                    Name : "Song D",
                    song_rating: 4
                }
            ],
            songs : []
        };
    }

    handleChange=(key, value)=>{
        this.setState({
            [key] : value
        },()=>{
            console.log("main page changed", this.state)
        })
    }

    componentDidMount() {
        getRandomSongs(this.handleChange, 'songs')
    }

    render(){
        const classes = makeStyles(theme => ({
            icon: {
                marginRight: theme.spacing(2),
            },
            heroContent: {
                backgroundColor: theme.palette.background.paper,
                padding: theme.spacing(8, 0, 6),
            },
            heroButtons: {
                marginTop: theme.spacing(4),
            },
            cardGrid: {
                paddingTop: theme.spacing(8),
                paddingBottom: theme.spacing(8),
            },
            card: {
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            },
            cardMedia: {
                paddingTop: '56.25%', // 16:9
            },
            cardContent: {
                flexGrow: 1,
            },
            footer: {
                backgroundColor: theme.palette.background.paper,
                padding: theme.spacing(6),
            },
        }));
        return (
            <React.Fragment>
                <CssBaseline />

                <main>
                    {/* Hero unit */}
                    <div className={classes.heroContent}>
                        <Container maxWidth="sm">
                            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                                Focus Album
                            </Typography>
                            <Typography variant="h5" align="center" color="textSecondary" paragraph>
                                Something about the focus Album, should display different album when hover on it
                            </Typography>

                        </Container>
                    </div>
                    <Container className={classes.cardGrid} maxWidth="md">
                        {/* End hero unit */}
                        <Grid container spacing={4}>
                            {this.state.songs.map(song => (
                                <Grid item key={song.NAME} xs={12} sm={6} md={4}>
                                    <Card className={classes.card} >
                                        <CardContent className={classes.cardContent}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {song.NAME}
                                            </Typography>
                                            <Typography>
                                                Song's Rating : {song.RATING}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </main>
                {/* Footer */}
                <footer className={classes.footer}>
                    <Typography variant="h6" align="center" gutterBottom>
                        Thanks for visiting. Enjoy!
                    </Typography>
                    <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                        Please give us credit for doing everything!
                    </Typography>
                    <Copyright />
                </footer>
                {/* End footer */}
            </React.Fragment>
        );
    }

}