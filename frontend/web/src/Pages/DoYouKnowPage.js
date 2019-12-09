import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Row,Rate, Button,Table,PageHeader} from 'antd';
import {quickEntry} from '../Services/DoYouKnowService'



const column_types = [
    [
        {
            title: 'Singer',
            dataIndex: 'NAME',
            key: 'NAME',
        },

        {
            title: 'Song Count',
            dataIndex: 'NUM',
            key: 'NUM',
        },
    ],
    [
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
            render: text => <Rate disabled value={text}/>,
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
    ],
    [
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
            render: text => <Rate disabled value={text}/>,
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
    ],
    [

        {
            title: 'Singer',
            dataIndex: 'ARTIST_NAME',
            key: 'ARTIST_NAME',

        },
        {
            title: 'Best Songs',
            dataIndex: 'NUM_BEST',
            key: 'NUM_BEST',
        },
        {
            title: 'Worst Songs',
            dataIndex: 'NUM_WORST',
            key: 'NUM_WORST',
        },
    ],
    [

        {
            title: 'Singer',
            dataIndex: 'ARTIST_NAME',
            key: 'ARTIST_NAME',

        },
        {
            title: 'Genres Count',
            dataIndex: 'NUM1',
            key: 'NUM1',
        },
        {
            title: 'Songs Count',
            dataIndex: 'NUM2',
            key: 'NUM2',
        },
    ],
    [


        {
            title: 'Country',
            dataIndex: 'COUNTRY',
            key: 'COUNTRY',
        },
        {
            title: 'Count',
            dataIndex: 'NUM',
            key: 'NUM',
        },
    ],
    [


        {
            title: 'Country',
            dataIndex: 'COUNTRY',
            key: 'COUNTRY',
        },
        {
            title: 'Count',
            dataIndex: 'NUM',
            key: 'NUM',
        },
    ],
    [

        {
            title: 'Year',
            dataIndex: 'YEAR',
            key: 'YEAR',

        },
        {
            title: 'Genre Name',
            dataIndex: 'GENRE_NAME',
            key: 'GENRE_NAME',
        },
        {
            title: 'Genre Count',
            dataIndex: 'NUM',
            key: 'NUM',
        },
    ],
];

const query_description = [
    'Search 1: Which singer has the most songs in our database?',
    'Search 2: Which song has the longest duration in our database?',
    'Search 3: What are the most ancient songs in our database? ',
    `Search 4: Every singer with his/her numbers of best songs & worst songs`,
    'Search 5: This query selects all those singers who have created more than 12 different genres and more than 120 different songs',
    'Search 6: Select the place where most singers were from (not NULL), then find all those singers that was born at this place',
    'Search 7: Select the place where most songs were from & the number of songs from that place',
    'Search 8: Select the most productive genre (most songs in that genre) in different years'
];

export default class DoYouKnowPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            from_year : 1900,
            to_year : 2000,
            song_rating : 5,
            genres : [],
            search_type : 'song',
            search_key : '',
            songs : [],
            focus_index : 0

        };
    }

    handleChange=(key, value)=>{
        this.setState({
            [key] : value
        },()=>{
            console.log("value changed, and the current state is", this.state)
        })
    };

    handleQuickEntry=(index)=>{
        this.setState({
            focus_index : index
        })
        quickEntry(this.handleChange, 'songs', index)
    }

    render(){

        return (
            <React.Fragment>
                <CssBaseline />
                <main>
                    {/* Hero unit */}

                    <PageHeader
                        style={{
                            border: '1px solid rgb(235, 237, 240)',
                        }}

                        title="Do You Know? "
                        subTitle="Click the entry you are interested!"
                    />

                    {
                        query_description.map((query,index)=>{
                            return(
                                <Row key={index} className={'search_query_row'}>
                                    <Button icon="search" onClick={()=>this.handleQuickEntry(index)} style={{textAlign: "left",width: '100%'}}>
                                        {query}
                                    </Button>

                                </Row>
                            )
                        })
                    }

                    <Row>
                        {this.state.songs.length === 0 ? <div/>
                        :
                            <Table columns={column_types[this.state.focus_index]} dataSource={this.state.songs} />
                        }

                    </Row>

                </main>

            </React.Fragment>
        );
    }

}