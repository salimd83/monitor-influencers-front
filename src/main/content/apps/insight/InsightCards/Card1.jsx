import React, { Component } from 'react';
import Widget from '../widgets/Widget2';
import data from './data/card1-data';

const options = {
  popovertext: 'the content of widget1 popover',
  data: data()
};

class Card1 extends Component {
  render() {
    return <Widget {...options} />;
  }
}

export default Card1;
