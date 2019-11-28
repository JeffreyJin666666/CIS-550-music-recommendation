import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Col, Input, Row} from 'antd';
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

        };
    }

    componentDidMount() {
        console.log("search page loading")
    }


    handleChange(){

    }

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
                            <GeneralSelectComponent/>
                        </Col>
                        <Col span={6}>
                            <SongRatingComponent/>
                        </Col>
                        <Col span={2}>From: </Col>
                        <Col span={4}><YearComponent/></Col>
                        <Col span={2}>To: </Col>
                        <Col span={4}><YearComponent/></Col>
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

            </React.Fragment>
        );
    }

}