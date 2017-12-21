import React from 'react';
import Instructor from './Instructor';
import Dates from './Dates';

class Sidebar extends React.Component {
  render() {
    return (
      <div>
        Workshop Sidebar
        <Instructor />
        <Dates />
      </div>
    );
  }
}

export default Sidebar;
