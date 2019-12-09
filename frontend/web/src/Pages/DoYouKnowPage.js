import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Row,Rate, Button,Table,PageHeader} from 'antd';
import {quickEntry} from '../Services/DoYouKnowService'

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


const query_description = [
    'Search 1',
    'Search 2',
    'Search 3'
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
                                    <Button icon="search" onClick={()=>this.handleQuickEntry(index)} style={{width: 200}}>
                                        {query}
                                    </Button>

                                </Row>
                            )
                        })
                    }

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