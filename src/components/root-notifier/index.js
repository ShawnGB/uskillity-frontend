import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { translate } from "react-i18next";
import { compose } from "redux";
import { toast } from "react-toastify";

class RootNotifier extends React.Component {
  notifyUser(toasts) {
    const { t, dispatch } = this.props;
    toasts &&
      toasts.forEach(({ type, stringKey, message, autoClose }) => {
        const msg = stringKey ? t(stringKey) : message;
        toast[type](msg, { autoClose });
      });

    toasts && toasts.length && dispatch({type: "NO_SUCH_THING_EXCEPT_TO_CLEAR_UP_TOASTS"})
  }

  componentWillReceiveProps(nextProps) {
    const { notifier } = nextProps;
    if (notifier) {
      this.notifyUser(notifier.toasts);
    }
  }

  render() {
    // props.history.replace("/")
    return null;
  }
}

const mapStateToProps = state => ({
  session: state.session,
  notifier: state.notifier
});

export default compose(
  withRouter,
  translate("toasts"),
  connect(mapStateToProps)
)(RootNotifier);
