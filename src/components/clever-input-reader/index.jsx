import React from "react";
import { translate} from "react-i18next";
import { Row, Col, FormControl } from "react-bootstrap";
import { compose } from "redux";
import { connect } from "react-redux";

class CleverInputReader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPwd: props.type === "password",
      type: props.type,
      score: "null",
      demand: props.demand || "",
      demandColor: props.demandColor
    };
    this.showHide = this.showHide.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    //this.passwordStrength = this.passwordStrength.bind(this);
  }

  componentWillMount() {
    this.setDemandAndColor(this.props.value || this.props.defaultValue)
  }

  showHide(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      type: this.state.type === "input" ? "password" : "input"
    });
  }

  zxcvbn(dummy) {
    return 100;
  }

  /*  passwordStrength(e) {*/
  //if (e.target.value === "") {
  //this.setState({
  //score: "null"
  //});
  //} else {
  //let pw = this.zxcvbn(e.target.value);
  //this.setState({
  //score: pw.score
  //});
  //}

  //this.props.handlePasswordChange(e);
  /*}*/

  setDemandAndColor(value) {
    if (this.props.hintless) { return }
    let validations = this.props.validate(value);
    if (validations) {
      this.setState({
        demand: validations.message,
        demandColor: validations.color
      });
    }
  }

  onContentChange(e) {
    this.setDemandAndColor(e.target.value)
    this.props.onChange(e);
  }

  render() {
    return (
      <div style={{ ...this.props.style }}>
        <div>
          <FormControl
            componentClass={this.props.componentClass}
            type={this.state.type}
            name={this.props.name}
            placeholder={this.props.placeholder}
            disabled={this.props.disabled}
            onChange={this.onContentChange}
            defaultValue={this.props.defaultValue}
            value={this.props.value}
            style={{ borderRadius: "0px", borderColor: "#9b9b9b" }}
          />
          {this.state.isPwd ? (
            <span className="password__show" onClick={this.showHide}>
              {this.state.type === "input" ? "Hide" : "Show"}
            </span>
          ) : null}
        </div>
      {this.props.hintless ? null :
        <Row>
          <Col xs={6}>
            <p className="validation">{this.props.hint}</p>
          </Col>
          <Col xs={6} style={{ color: `${this.state.demandColor}` }}>
            {this.state.isPwd ? (
              <span
                className="password__strength"
                data-score={this.state.score}
              />
            ) : (
              <h5 className="validation">{this.state.demand}</h5>
            )}
          </Col>
        </Row>
      }
      </div>
    );
  }
}


const mapStateToProps = state => ({
  session: state.session
});

export default compose(translate("translations"), connect(mapStateToProps))(
 CleverInputReader
);
