import React from "react";
import Instructor from "./Instructor";
import Participations from "./participations";
import WorkshopRating from "./WorkshopRating";

class Sidebar extends React.Component {
  render() {
    return (
      <div>
        <Instructor workshop={this.props.workshop} />
        <Participations
          workshop={this.props.workshop}
          dispatch={this.props.dispatch}
        />
        <WorkshopRating
          workshop={this.props.workshop}
          dispatch={this.props.dispatch}
        />
      </div>
    );
  }
}

export default Sidebar;
