import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

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
            ]
        };
    }

    componentDidMount() {

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
                {/*<AppBar position="relative">*/}
                {/*    <Toolbar>*/}
                {/*        <CameraIcon className={classes.icon} />*/}
                {/*        <Typography variant="h6" color="inherit" noWrap>*/}
                {/*            Album layout*/}
                {/*        </Typography>*/}
                {/*    </Toolbar>*/}
                {/*</AppBar>*/}
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
                            {this.state.cards.map(card => (
                                <Grid item key={card} xs={12} sm={6} md={4}>
                                    <Card className={classes.card}>
                                        <CardMedia
                                            className={classes.cardMedia}
                                            image="https://source.unsplash.com/random"
                                            title="Image title"
                                        />
                                        <CardContent className={classes.cardContent}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {card.Name}
                                            </Typography>
                                            <Typography>
                                                Song's Rating : {card.song_rating}
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