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
import {Col, Input, Row} from 'antd';
import GeneralSelectComponent from "./SearchComponents/GenereSelectComponents";
import SongRatingComponent from "./SearchComponents/SongRatingComponent";
import YearComponent from "./SearchComponents/YearComponent";

const { Search } = Input;

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


export default class SearchPage extends React.Component{

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
                <main>
                    {/* Hero unit */}
                    <Row>
                        <Col span={6}>
                            <Search
                                placeholder="input search text"
                                onSearch={value => console.log(value)}
                                style={{ width: 200 }}
                            />
                        </Col>
                        <Col span={6}>
                            <GeneralSelectComponent/>
                        </Col>
                        <Col span={6}>
                            <SongRatingComponent/>
                        </Col>
                        <Col span={6}>From: <YearComponent/> To: <YearComponent/></Col>
                    </Row>

                    <Row>
                        <Row>
                            Quick Entry 1
                        </Row>
                        <Row>
                            Quick Entry 2
                        </Row>
                        <Row>
                            Quick Entry 3
                        </Row>
                        <Row>
                            Quick Entry 4
                        </Row>
                    </Row>

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