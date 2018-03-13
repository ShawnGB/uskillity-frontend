import React from "react";
import { connect } from "react-redux";
import { translate, Trans } from "react-i18next";
import { compose } from "redux";
import Sidebar from "./Sidebar";
import * as util from "app:utils/utils";
import * as skillActions from "app:store/actions/skill";
import "./style.css";

class Workshop extends React.Component {
  constructor(props) {
    super(props);
    this.id = +this.props.match.params.id;
  }

  componentWillMount() {
    this.props.dispatch(skillActions.fetchWorkshop(this.id));
  }

  render() {
    const { levels, workshops } = this.props.skills;
    const workshop = workshops.find(w => w.id === this.id);

    if (!workshop) {
      return null;
    }

    const level = levels.find(i => i.id === workshop.level_id) || {};

    return (
      <div>
        <div
          className="workshop-main-image"
          style={{ backgroundImage: `url(${workshop.images[0]})` }}
        />
        <div className="row">
          <div className="col-sm-7 col-md-8">
            <h2 className="hdr-type" style={{ marginBottom: "0px" }}>
              {workshop.title}
            </h2>
            <p>{workshop.full_address}</p>

            <div className="row workshop-info-table">
              <div className="col-md-2 hidden-sm hidden-xs">
                <Trans i18nKey="workshop.recommended_label">Recommended</Trans>
              </div>
              <div className="col-md-4 col-sm-4 col-xs-12">
                <div className="row">
                  <div className="col-md-4 col-sm-6 col-xs-3 content-right">
                    Age:
                  </div>
                  <div className="col-md-8 col-sm-6 col-xs-9">
                    {" "}
                    {workshop.min_age} {" - "} {workshop.max_age}
                  </div>

                  <div className="col-md-4 col-sm-6 col-xs-3 content-right">
                    Level:
                  </div>
                  <div className="col-md-8 col-sm-6 col-xs-9">{level.name}</div>

                  <div className="col-md-4 col-sm-6 col-xs-3 content-right">
                    Other:
                  </div>
                  <div className="col-md-8 col-sm-6 col-xs-9"> - </div>
                </div>
              </div>
              <div className="col-md-6 col-sm-8 col-xs-12">
                <div className="row">
                  <div className="col-sm-4 col-xs-3 content-right">
                    Sessions:
                  </div>
                  <div className="col-sm-8 col-xs-9">
                    {workshop.sessions.map((session, i) => (
                      <div key={i} className="row">
                        <div className="col-sm-4 col-xs-3 content-right">
                          {util.parseSessionDateTime(
                            session.starts_at,
                            "DD.MM.YY"
                          )}
                        </div>
                        <div className="col-sm-8 col-xs-9">
                          {util.parseSessionDateTime(session.starts_at)}
                          {" - "}
                          {util.parseSessionDateTime(session.ends_at)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <h3 className="hdr-type">
              <Trans i18nKey="workshop.description_label">Description</Trans>
            </h3>
            <p>{workshop.description}</p>
            <h3 className="hdr-type">
              <Trans i18nKey="workshop.about_the_instructor_label">
                About the instructor
              </Trans>
            </h3>
            <p>{workshop.provider.about}</p>
            <p>{workshop.about}</p>
          </div>
          <div className="col-xs-4 hidden-sm hidden-md hidden-lg" />
          <div className="col-sm-5 col-md-4 col-xs-4">
            <Sidebar workshop={workshop} dispatch={this.props.dispatch}/>
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
