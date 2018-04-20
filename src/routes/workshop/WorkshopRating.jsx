import React from "react";
import Rating from "react-rating";
import * as skillActions from "app:store/actions/skill";

class WorkshopRating extends React.Component {
  onChange(value) {
    const { dispatch } = this.props;
    dispatch(skillActions.submitRating(value, this.props.workshop.id));
  }
  render() {
    return (
      <Rating
        className="glyphicon"
        emptySymbol="glyphicon glyphicon-star-empty"
        fullSymbol="glyphicon glyphicon-star"
        initialRating={this.props.workshop.rating}
        onChange={this.onChange.bind(this)
        }
      />
    );
  }
}

export default WorkshopRating;
