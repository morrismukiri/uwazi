import React, {Component} from 'react';
import {connect} from 'react-redux';

export class zorlakayHomepage extends Component {

  render() {
    return (
      <div>
        <h1>Hello world</h1>
      </div>
    );
  }
}

export default connect()(zorlakayHomepage);
