import React from "react";
import { translate } from "react-i18next";
import {Elements} from 'react-stripe-elements';
import { compose } from "redux";
import { connect } from "react-redux";
import "./style.css";
import ParticipationForm from "app:components/participation-form";

class Participations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      session_id: 0,
      ticket_count: 0
    };
  }

  render() {
    const username = this.props.session.user.first_name + ' ' + this.props.session.user.name;
    return (
      <div style={{marginTop: "20px"}}>
        {" "}
        <div className="ticketing-info">
          <h4 style={{margin: "4px"}}> {this.props.workshop.fees} € per person </h4>
          <h4 style={{margin: "4px"}}> {this.props.workshop.maximum_workshop_registration_count || 999} spots available per session </h4>
        </div>
        <Elements>
          <ParticipationForm workshop={this.props.workshop} dispatch={this.props.dispatch} cardholder={username}/>
        </Elements>
      </div>
    );
  }
}
export const mapStateToProps = state => ({
  session: state.session
});

export default compose(
  translate("translations"),
  connect(mapStateToProps)
)(Participations);
