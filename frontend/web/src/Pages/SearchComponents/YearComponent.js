import { Select } from 'antd';
import React from "react";

const { Option } = Select;

const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

function handleChange(value) {
    console.log(`selected ${value}`);
}

export default class YearComponent extends React.Component{

    render() {
        return(
            <div>

                <Select defaultValue="lucy" style={{ width: 120 }} >
                    <Option value="lucy">1990</Option>
                </Select>
            </div>
        )
    }
}

