import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Col, Input, Row,Rate, Button,Table,  Radio} from 'antd';
import GeneralSelectComponent from "./SearchComponents/GenereSelectComponents";
import SongRatingComponent from "./SearchComponents/SongRatingComponent";
import YearComponent from "./SearchComponents/YearComponent";
import {searchQuery} from '../Services/DoYouKnowService'


const columns = [
    {
        title: 'Song',
        dataIndex: 'NAME',
        key: 'NAME',
    },
    {
        title: 'Release',
        dataIndex: 'YEAR',
        key: 'YEAR',
    },
    {
        title: 'Rating',
        dataIndex: 'RATING',
        key: 'RATING',
        render: text => <Rate defaultValue={text}/>,
    },
    {
        title: 'Genre',
        dataIndex: 'GENRE_NAME',
        key: 'GENRE_NAME',
    },
    {
        title: 'Singer',
        dataIndex: 'ARTIST_NAME',
        key: 'ARTIST_NAME',

    },
    {
        title: 'Country',
        dataIndex: 'COUNTRY',
        key: 'COUNTRY',
    },
    {
        title: 'Duration',
        dataIndex: 'DURATION',
        key: 'DURATION',
    },
];



export default class SearchPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
           from_year : 1900,
            to_year : 2000,
            song_rating : 5,
            genres : "",
            search_type : 'song',
            search_key : '',
            songs: []

        };
    }


    handleChange=(key, value)=>{
        this.setState({
            [key] : value
        },()=>{
            console.log("value changed, and the current state is", this.state)
        })
    };

    handleButtonClick=()=>{

        searchQuery(this.handleChange, 'songs', this.state)
    };



    render(){

        return (
            <React.Fragment>
                <CssBaseline />
                <main>
                    {/* Hero unit */}
                    <Row className={' search_row search_box'} >
                        <Col span={18}>
                            <Input placeholder="input search text" onChange={e => this.handleChange('search_key', e.target.value)} style={{ width: '100%' }}/>

                        </Col>
                        <Col span={6} className={'search_button_box'}>
                            <Radio.Group onChange={(e)=>this.handleChange('search_type', e.target.value)} defaultValue={this.state.search_type}>
                            <Radio value={'song'}>Song</Radio>
                            <Radio value={'singer'}>Singer</Radio>
                         </Radio.Group>
                        </Col>
                    </Row>
                    <Row className={'search_row '}>

                        <Col span={6}>
                            <GeneralSelectComponent value={this.state.genres} choose_key={'genres'} onChange={this.handleChange} />
                        </Col>
                        <Col span={4} className={'search_type_box'}>
                            <SongRatingComponent value={this.state.song_rating} choose_key={'song_rating'} onChange={this.handleChange}/>
                        </Col>
                        <Col span={2} className={'search_type_box'}>From: </Col>
                        <Col span={3}><YearComponent  value={this.state.from_year} choose_key={'from_year'} onChange={this.handleChange}/></Col>
                        <Col span={2} className={'search_type_box'}>To: </Col>
                        <Col span={3}><YearComponent  value={this.state.to_year} choose_key={'to_year'} onChange={this.handleChange}/></Col>
                        <Col span={4} className={'search_button_box'}>
                            <Button type="primary" onClick={this.handleButtonClick} icon="search">
                                Search
                            </Button>
                        </Col>
                    </Row>
                    <br/>
                    <br/>
                    <br/>

                    <Row>
                        {this.state.songs.length === 0 ? <div/>
                            :
                            <Table columns={columns} dataSource={this.state.songs} />
                        }

                    </Row>

                </main>

            </React.Fragment>
        );
    }

}