import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { PropTypes } from "prop-types";

const AuthRoot = props => {
  // props.history.replace("/")
  return null;
};

AuthRoot.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default withRouter(connect(state => state.session)(AuthRoot));
