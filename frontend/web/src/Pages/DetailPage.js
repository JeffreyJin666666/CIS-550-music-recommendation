import React from 'react';

export default class DetailPage extends React.Component{



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

        return (
            <div/>
        );
    }

}