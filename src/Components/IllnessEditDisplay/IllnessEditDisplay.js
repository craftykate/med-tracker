import React, { Component } from 'react';
import './IllnessEditDisplay.css';


export class IllnessEditDisplay extends Component {

  // render list of records
  renderRecords = () => {
    let recordList;
    if (this.props.illness.records) {
      recordList = this.props.illness.records.map(record => {
        return (
          <li key={record.id}>
            <input
              className="medRecord"
              value={record.info}
              />
          </li>
        )
      })
    }
    return recordList;
  }

  render() {
    return (
      <div className="popup">
        <div className="MedEvent popup_inner">
          <input
            className="name"
            value={this.props.illness.name}
            placeholder="Can't be empty"
            />
          <ul>
            {this.renderRecords()}
          </ul>
          <div className="editDelete">
            <span>
              <button onClick={this.props.removeEditBox}>Done</button>
            </span>
            (<a onClick={() => this.props.deleteIllness(this.props.illness.id)}>
              delete {this.props.illness.name}
            </a>)
          </div>
        </div>
      </div>
    );
  }
}
