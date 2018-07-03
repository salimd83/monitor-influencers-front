import React, {Component} from 'react'
import Widget             from '../widgets/Widget3'
import data               from './data/card2-data'

const options = {
    popovertext: 'the content of card1 popover',
    data       : data()
}

class Card2 extends Component {
    render() {
        return <Widget {...options} />
    }
}

export default Card2
