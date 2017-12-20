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
            <a
              className="delRecord"
              onClick={() => this.props.deleteRecord(this.props.illness.id, record.id)}>
              del
            </a>
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
            onChange={(event) => this.props.updateIllnessName(event, this.props.illness.id)}
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
