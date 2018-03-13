import React from "react";
import { connect } from "react-redux";
import { translate, Trans } from "react-i18next";
import CardSection from "app:components/card-section";
import * as profileActions from "app:store/actions/profile";
import {injectStripe} from 'react-stripe-elements';
import CleverInputReader from "app:components/clever-input-reader";
import { validateContentByLength } from "app:utils/utils";


class PaymentMethodForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardholder: this.props.cardholder || "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    // if (this.state.ticket_count <= 0 || this.state.session_id === 0) {
    //   toast.warning("Please choose the session and ticket count");
    //   return;
    // }
    this.props.stripe.createToken({name: this.state.cardholder}).then(({token}) => {
      console.log('Received Stripe token:', token);
      const { dispatch, session } = this.props;
      dispatch(profileActions.updateUser(
        { user:
          { stripe_temporary_token:
            {
              id: token.id,
              brand: token.card.brand,
              last4: token.card.last4
            }
          }
        }, session.user.id));
    });

  }

  render() {
    return(
      <div className="form-group">
        <CardSection />
        <CleverInputReader
          componentClass={"input"}
          type={"input"}
          name={"cardholder"}
          placeholder={"Cardholder Name"}
          value={this.state.cardholder || ""}
          onChange={this.handleChange}
          demand={"Too short"}
          hint={""}
          validate={c => {
            return validateContentByLength(c, 2, 99);
          }}
        />
        <button style={{margin: "8px auto"}}
          className="btn btn-default uski-button-style"
          type="button"
          onClick={this.handleSubmit}
          >
            <Trans>Add Payment Method</Trans>
          </button>
        </div>
          );
  }
}

export const mapStateToProps = state => ({
  session: state.session
});

export default translate("translations")(injectStripe(connect(mapStateToProps)(PaymentMethodForm)));
