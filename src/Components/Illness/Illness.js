import React, { Component } from 'react';
import './Illness.css';
import { IllnessDisplay } from '../IllnessDisplay/IllnessDisplay';
import { IllnessEditDisplay } from '../IllnessEditDisplay/IllnessEditDisplay';


export class Illness extends Component {
  state = {
    editIllness: false
  }

  showEditBoxHandler = () => {
    this.setState({
      editIllness: !this.state.editIllness
    })
  }

  render() {
    let editComponent = null;
    if (this.state.editIllness) {
      editComponent = (
        <IllnessEditDisplay
          illness={this.props.illness}
          removeEditBox={this.showEditBoxHandler}
          deleteIllness={this.props.deleteIllness}
          updateIllnessName={this.props.updateIllnessName}
          deleteRecord={this.props.deleteRecord}
        />
      )
    }
    return (
      <div>
        <IllnessDisplay
          illness={this.props.illness}
          saveNewRecord={this.props.saveNewRecord}
          editIllness={this.showEditBoxHandler}/>
        {editComponent}
      </div>
    );
  }
}
