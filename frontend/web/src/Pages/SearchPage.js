import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Col, Input, Row, Button} from 'antd';
import GeneralSelectComponent from "./SearchComponents/GenereSelectComponents";
import SongRatingComponent from "./SearchComponents/SongRatingComponent";
import YearComponent from "./SearchComponents/YearComponent";

const { Search } = Input;

export default class SearchPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
           from_year : 1900,
            to_year : 2000,
            song_rating : 5,
            genres : []

        };
    }

    componentDidMount() {
        console.log("search page loading")
    }

    handleQuickEntry=(entry)=>{

    };


    handleChange=(key, value)=>{
        this.setState({
            [key] : value
        },()=>{
            console.log("value changed, and the current state is", this.state)
        })
    };

    render(){

        return (
            <React.Fragment>
                <CssBaseline />
                <main>
                    {/* Hero unit */}
                    <Row className={' search_row search_box'} >
                        <Search
                            placeholder="input search text"
                            onSearch={value => console.log(value)}
                            style={{ width: '100%' }}
                        />
                    </Row>
                    <Row className={'search_row '}>

                        <Col span={6}>
                            <GeneralSelectComponent value={this.state.genres} choose_key={'genres'} onChange={this.handleChange} />
                        </Col>
                        <Col span={6}>
                            <SongRatingComponent value={this.state.song_rating} choose_key={'song_rating'} onChange={this.handleChange}/>
                        </Col>
                        <Col span={2}>From: </Col>
                        <Col span={4}><YearComponent  value={this.state.from_year} choose_key={'from_year'} onChange={this.handleChange}/></Col>
                        <Col span={2}>To: </Col>
                        <Col span={4}><YearComponent  value={this.state.to_year} choose_key={'to_year'} onChange={this.handleChange}/></Col>
                    </Row>
                    <br/>
                    <br/>
                    <br/>
                    <Row>
                        <Row>Do You Know? </Row>
                        <Row>
                            <Button icon="search" onClick={()=>this.handleQuickEntry(1)}>
                                Quick Entry 1
                            </Button>

                        </Row>
                        <Row>
                            <Button icon="search" onClick={()=>this.handleQuickEntry(2)}>
                                Quick Entry 2
                            </Button>
                        </Row>
                        <Row>
                            <Button icon="search" onClick={()=>this.handleQuickEntry(3)}>
                                Quick Entry 3
                            </Button>
                        </Row>
                        <Row>
                            <Button icon="search" onClick={()=>this.handleQuickEntry(4)}>
                                Quick Entry 4
                            </Button>
                        </Row>
                    </Row>

                    <Row>
                        Display Area
                    </Row>

                </main>

            </React.Fragment>
        );
    }

}