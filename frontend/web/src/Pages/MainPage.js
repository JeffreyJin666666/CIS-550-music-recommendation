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
import { Card as AntdCard, Rate} from 'antd';
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
            focus_index : 0,
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

    handleOnHover=(index)=>{
        this.setState({
            focus_index : index
        })
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
                    {this.state.songs.length !== 0 ?
                        <div className={'focus_song'} >
                            <AntdCard title={this.state.songs[this.state.focus_index].NAME} bordered={false} style={{ width: 300 }}>
                                <Rate disabled value={this.state.songs[this.state.focus_index].RATING} />
                                <p>Release: {this.state.songs[this.state.focus_index].YEAR}</p>
                                <p>Genre: {this.state.songs[this.state.focus_index].GENRE_NAME}</p>
                                <p>Artist: {this.state.songs[this.state.focus_index].ARTIST_NAME}</p>
                            </AntdCard>
                        </div>
                        : null}


                    <Container className={classes.cardGrid} maxWidth="md">
                        {/* End hero unit */}
                        <Grid container spacing={4}>
                            {this.state.songs.map((song,index) => (
                                <Grid item key={song.NAME} xs={12} sm={6} md={4}>
                                    <Card className={classes.card} onMouseOver={()=>this.handleOnHover(index)}>
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