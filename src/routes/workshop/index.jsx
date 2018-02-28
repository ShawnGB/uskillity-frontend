import React from "react";
import { connect } from "react-redux";
import { translate, Trans } from "react-i18next";
import { compose } from "redux";
import Sidebar from "./Sidebar";
import * as util from "app:utils/utils";
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
            <div className="col-sm-9">
              <p className="workshop-name">{workshop.title}</p>
              <p>{workshop.full_address}</p>
                <div className="row row-spacing">
                  <div className="col-sm-2">
                    <p className="workshop-title">
                      <Trans i18nKey="workshop.recommended_label">Recommended</Trans>
                    </p>
                  </div>
                </div>
                <div className="row row-spacing">
                  <div className="col-sm-3">
                    <ul>
                      <li>
                        Age: {workshop.min_age}
                        {" - "}
                        {workshop.max_age}
                      </li>
                      <li>Other: </li>
                      <li>Level: {level.name}</li>
                    </ul>
                  </div>
                  <div className="col-sm-3">
                    <div>
                      Sessions:{workshop.sessions.map((session, i) => (
                        <p key={i}>
                          {" "}
                          {util.parseSessionDateTime(
                            session.starts_at,
                            "DD.MM.YY"
                          )}{" "}
                          {util.parseSessionDateTime(session.starts_at)}
                          {" - "}
                          {util.parseSessionDateTime(session.ends_at)}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
            </div>
            <div className="col-sm-3">
              <Sidebar workshop={this.state.workshop} />
            </div>
            <div className="row row-spacing">
              <div className="col-md-9">
                <p className="workshop-title">
                  <Trans i18nKey="workshop.description_label">Description</Trans>
                </p>
                <p className="workshop-content">{workshop.description}</p>
                <p className="workshop-title">
                  <Trans i18nKey="workshop.about_the_instructor_label">
                    About the instructor
                  </Trans>
                </p>
                <p className="workshop-content">{workshop.provider.about}</p>
                <p className="workshop-content">{workshop.about}</p>
              </div>
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
