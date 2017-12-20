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

  sortRecords = () => {
    let sortedRecords = this.props.illness.records.sort(function(a, b) {
      const dateA = a.date;
      const dateB = b.date;
      if (dateA < dateB) {
        return -1;
      }
      if (dateA > dateB) {
        return 1;
      }
      // names must be equal
      return 0;
    });
    return sortedRecords;
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
          updateRecordInfo={this.props.updateRecordInfo}
        />
      )
    }
    return (
      <div>
        <IllnessDisplay
          illness={this.props.illness}
          sortedRecords={this.sortRecords()}
          saveNewRecord={this.props.saveNewRecord}
          editIllness={this.showEditBoxHandler}
          updateStorage={this.props.updateStorage}
        />
        {editComponent}
      </div>
    );
  }
}
