import { Rate } from 'antd';
import React from "react";


export default class SongRatingComponent extends React.Component{

    render() {
        return(
            <Rate  value={this.props.value} onChange={(v)=>this.props.onChange(this.props.choose_key, v)}/>
        )
    }
}

