import React from "react";
import { connect } from "react-redux";
import { translate, Trans } from "react-i18next";
import { compose } from "redux";
import Sidebar from "./Sidebar";
import "./style.css";

class Workshop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      workshop: {}
    };
  }

  findWorkshopWithId = () => {
    const { skills } = this.props;
    const { workshops } = skills;
    let workshop = workshops.find(w => w.id === +this.state.id);
    this.setState({ workshop: workshop });
  };
  componentWillMount() {
    this.findWorkshopWithId();
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="jumbotron">
            <img
              src={this.state.workshop.images[0]}
              width="100%"
              height="60%"
              alt=""
            />
          </div>
          <div className="row row-spacing">
            <div className="col-sm-6">
              <p className="workshop-name">{this.state.workshop.title}</p>
            </div>
          </div>
          <div className="row row-spacing">
            <div className="col-sm-9">
              <p className="workshop-title">
                <Trans i18nKey="workshop.description_label">Description</Trans>
              </p>
              <p className="workshop-content">
                {this.state.workshop.description}
              </p>
              <p className="workshop-title">
                <Trans i18nKey="workshop.requirements_label">
                  Requirements
                </Trans>
              </p>
              <p className="workshop-content">
                ... Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                dolor sit
              </p>
              <p className="workshop-title">
                <Trans i18nKey="workshop.who_can_attend_label">
                  Who can attend
                </Trans>
              </p>
              <p className="workshop-content">
                ... Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                dolor sit
              </p>
              <p className="workshop-title">
                <Trans i18nKey="workshop.about_the_instructor_label">
                  About the instructor
                </Trans>
              </p>
              <p className="workshop-content">
                ... Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                dolor sit
              </p>
            </div>
            <div className="col-sm-3">
              <Sidebar workshop={this.state.workshop} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export const mapStateToProps = state => ({ skills: state.skills });
export default compose(translate("translations"), connect(mapStateToProps))(
  Workshop
);
