import React from 'react';
import './Sidebar.css';
import { AddIllness } from '../AddIllness/AddIllness';


export const Sidebar = (props) => {
  return (
    <aside>
      <AddIllness
        addIllnessName={props.addIllnessName}/>
    </aside>
  );
}
