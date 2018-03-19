import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { translate } from "react-i18next";
import { compose } from "redux";
import { toast } from "react-toastify";

class RootNotifier extends React.Component {
  notifyUser(toasts) {
    const { t } = this.props;
    toasts &&
      toasts.forEach(({ message, type, stringKey, autoClose }) => {
        const msg = stringKey ? t(stringKey) : message;
        toast[type](msg, { autoClose });
      });
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
  translate("translations"),
  connect(mapStateToProps)
)(RootNotifier);
