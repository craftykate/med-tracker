import React, { Component } from 'react';
import './Illness.css';
import { IllnessDisplay } from '../IllnessDisplay/IllnessDisplay';


export class Illness extends Component {

  render() {
    return (
      <div>
        <IllnessDisplay
          illness={this.props.illness}
          saveNewRecord={this.props.saveNewRecord}
        />
      </div>
    );
  }
}
