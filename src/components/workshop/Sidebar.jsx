import React from 'react';
import Instructor from './Instructor';
import Dates from './Dates';

class Sidebar extends React.Component {
  render() {
    return (
      <div>
        <Instructor />
        <Dates />
      </div>
    );
  }
}

export default Sidebar;
