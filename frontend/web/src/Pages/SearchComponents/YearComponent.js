import { Select } from 'antd';
import React from "react";

const { Option } = Select;

const children = [];
for (let i = 1922; i < 2012; i++) {
    children.push(<Option key={i.toString(10)}>{i.toString(10)}</Option>);
}



export default class YearComponent extends React.Component{

    render() {
        return(
            <div className={'year_component'}>
                <Select defaultValue={this.props.value} onChange={(v)=>this.props.onChange(this.props.choose_key, v)} style={{ width: '100' }} >
                    {children}
                </Select>
            </div>
        )
    }
}

