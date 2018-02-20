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
    let workshop = workshops.find(w => w.id === +this.state.id) || {};
    this.setState({ workshop: workshop });
  };
  componentWillMount() {
    this.findWorkshopWithId();
  }

  render() {
    const workshop = this.state.workshop;
    const { levels } = this.props.skills;
    let level = levels.find(i => i.id === workshop.level_id) || {};
    return (
      <div>
        <div className="container">
          <div className="jumbotron">
            <img src={workshop.images[0]} width="100%" height="60%" alt="" />
          </div>
          <div className="row row-spacing">
            <div className="col-sm-6">
              <p className="workshop-name">{workshop.title}</p>
              <p>TODO:Add location here</p>
            </div>
          </div>
          <div className="row row-spacing">
            <div className="col-sm-9">
              <p className="workshop-title">
                <Trans i18nKey="workshop.requirements_label">
                  Recommended
                </Trans>
</p>

              <ul>
                <li>
                  Age: {workshop.min_age}
                  {" - "}
                  {workshop.max_age}
                </li>
                <li>Other:</li>
                <li>Level:{level.name}</li>
              </ul>
              <p>
                Sessions:{workshop.sessions.map(
                  (session, i) => session.starts_at
                )}
              </p>
              <p className="workshop-title">
                <Trans i18nKey="workshop.description_label">Description</Trans>
              </p>

              <p className="workshop-content">{workshop.description}</p>
              <p className="workshop-title">Who can attend</p>
              <p className="workshop-content">
                May be remove this if not needed
              </p>
              <p className="workshop-title">
                <Trans i18nKey="workshop.about_the_instructor_label">
                  About the instructor
                </Trans>
</p>

              <p className="workshop-content">{workshop.about}</p>
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
