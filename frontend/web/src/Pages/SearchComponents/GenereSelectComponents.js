import { Select } from 'antd';
import React from "react";

const { Option } = Select;
var genre = [];
const raw = [
    'garage rock',
    'grime',
    'anime',
    'grindcore',
    'asian',
    'dangerous',
    'hardcore punk',
    'adam and the ants',
    'janet-jackson',
    'pop country rock',
    'polish',
    '80s synthpop',
    'a des annés d ici',
    'philadelphia',
    'soundtrack',
    'argentinean',
    'indonesian',
    'arrangeur',
    'catalan',
    'alternative hip hop',
    'new orleans',
    'american composer',
    'boise',
    'london',
    'alternative pop',
    'euro house',
    'aslı',
    'iowa',
    'carcass',
    'pleasure and pain',
    'crust punk',
    'country-za',
    'glasgow',
    'aarhus',
    'ambient rock',
    'reggae dubstep dancehall dub scotland glasgow',
    'asha-bhosle',
    'acoustic blues',
    'breton',
    'glam metal',
    '5 cent theatre',
    'nouvelle star',
    'samba pagode',
    'smooth jazz',
    'norberg',
    'mas mojinos',
    'ambient house',
    'brighton psychedelic',
    'acid house',
    'alternaive rock',
    'perth',
    'eurobeat',
    'latin cuba son guajira compay segundo',
    'bolton',
    'erroll garner',
    'andrews sisters',
    'iranian',
    'kim falo',
    'air',
    'psychobilly',
    'trailer music',
    'mathcore',
    'madison',
    'meredith brooks',
    'psychedelic trance',
    '2005',
    'kim buran',
    'country-it',
    'banda',
    'mountain tracks',
    'charity',
    'travis barker',
    'christian metal',
    'derby',
    'fixme'
];
raw.forEach(x=>{
    genre.push(<Option key={x}>{x}</Option>);
})

export default class GeneralSelectComponent extends React.Component{


    componentDidMount() {

    }

    render() {
        return(
            <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Please select"
                onChange={(v)=>this.props.onChange(this.props.choose_key, v)}
                defaultValue={this.props.value}
            >
                {genre}
            </Select>
        )
    }
}

