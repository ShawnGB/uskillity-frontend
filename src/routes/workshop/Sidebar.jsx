import React from 'react';
import Instructor from './Instructor';

class Sidebar extends React.Component {
  render() {
    return (
      <div>
        <Instructor workshop={this.props.workshop}/>
      </div>
    );
  }
}

export default Sidebar;
