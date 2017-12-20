import React, { Component } from 'react';
import './Sidebar.css';
import { AddIllness } from '../AddIllness/AddIllness';


export class Sidebar extends Component {

  render() {
    return (
      <aside>
        <AddIllness
          addIllnessName={this.props.addIllnessName}/>
      </aside>
    );
  }
}
