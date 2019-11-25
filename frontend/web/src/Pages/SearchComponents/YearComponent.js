import { Select } from 'antd';
import React from "react";

const { Option } = Select;

const children = [];
for (let i = 1922; i < 2012; i++) {
    children.push(<Option key={i.toString(10)}>{i.toString(10)}</Option>);
}



export default class YearComponent extends React.Component{


    handleChange(value) {
        console.log(`selected ${value}`);
    }
    render() {
        return(
                <Select defaultValue="1900" onChange={this.handleChange} style={{ width: '100' }} >
                    {children}
                </Select>
        )
    }
}

