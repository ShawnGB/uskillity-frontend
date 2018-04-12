import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { translate, Trans } from "react-i18next";
import { Link } from "react-router-dom";
import * as util from "app:utils/utils";
import "./style.css";
import { toast } from "react-toastify";
import * as skillActions from "app:store/actions/skill";

class ParticipationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      session_id: 0,
      ticket_count: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.sessionString = this.sessionString.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { dispatch } = this.props;

    if (this.state.ticket_count <= 0 || this.state.session_id === 0) {
      toast.warning("Please choose the session and ticket count");
      return;
    }
    dispatch(
      skillActions.reserveTickets(
        this.props.workshop.id,
        this.state.session_id,
        this.state.ticket_count
      )
    )
  }

  sessionString(session) {
    return (
      util.parseSessionDateTime(session.starts_at, "DD.MM.YY") +
      "  " +
      util.parseSessionDateTime(session.starts_at) +
      " - " +
      util.parseSessionDateTime(session.ends_at)
    );
  }

  render() {
    const hasPaymentMethod = this.props.session.paymentMethod && Object.keys(this.props.session.paymentMethod).length > 0
    const available =
    this.props.workshop.maximum_workshop_registration_count || 999;
    return(
      <div className="form-group">
        <select style={{margin: "8px auto"}}
          name="session_id"
          onChange={this.handleChange}
          className="skills-select-box"
          value={this.state.session_id}
          >
            <option>Choose a session</option>
            {this.props.workshop.sessions.map(ws => (
              <option key={ws.id} value={ws.id}>
                <p>{this.sessionString(ws)}</p>
                <p>
                  {" "}
                  {available - (ws.participations || []).length} spots left{" "}
                </p>
              </option>
            ))}
          </select>
          <select style={{margin: "8px auto"}}
            name="ticket_count"
            onChange={this.handleChange}
            className="skills-select-box"
            value={this.state.ticket_count}
            >
              <option>Ticket count</option>
              {Array.from(Array(5).keys()).map(i => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            {hasPaymentMethod &&
              <div>
                <p>You will pay for the workshop using your {this.props.session.paymentMethod.brand} card, ending in {this.props.session.paymentMethod.last4} </p>
                <p> To change your payment method, go to your <Link to={`/profile/${this.props.session.user.id}`}>profile</Link> page</p>
                <button style={{margin: "8px auto", width: "100%"}}
                  className="btn btn-primary uski-button-style"
                  type="button"
                  onClick={this.handleSubmit}
                  >
                    <Trans>Reserve</Trans>
                  </button>
                </div>
            }
            {!hasPaymentMethod &&
              <div>
                <p>Please add a payment method in your <Link to={`/profile/${this.props.session.user.id}`}>profile</Link> first.</p>
              </div>
            }
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
)(ParticipationForm);
