import React, { Component } from "react";
import { translate, Trans } from "react-i18next";
import { compose } from "redux";
import { connect } from "react-redux";
import * as skillActions from "app:store/actions/skill";
import "./style.css";

class ShareSkill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workshop: {
        title: "",
        category_id: "",
        description: "",
        requirements: "",
        ageTo: "",
        ageFrom: "",
        participants: "",
        dateAndTime: "",
        location: "",
        price: "",
        published_at: "" //TODO:ask sandeep if we need to pass published_at
      },
      sessions: [{}],
      error: {
        message: ""
      },
      level_id: "",
      file: {},
      imagePreviewUrl: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addRow = this.addRow.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(skillActions.fetchLevels());
    dispatch(skillActions.fetchCategories());
  }

  addRow() {
    const { dispatch, skills } = this.props;
    const { workshops } = skills;
    var sessions = this.state.sessions;
    sessions.push({});
    this.setState({ sessions });
    let wId = workshops[workshops.length - 1].id;
    dispatch(skillActions.saveWorkshopSession(wId, sessions));
  }

  addWorkshopSession(i, e) {
    let sessions = this.state.sessions;
    const input = e.target.name;
    sessions[i][input] = e.target.value;
    this.setState({ sessions });
  }

  handleChange(e) {
    const input = e.target.name;
    const workshop = this.state.workshop;
    workshop[input] = e.target.value;
    this.setState({ workshop });
  }

  handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    if (file) {
      reader.readAsDataURL(file);
    }

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };
  }

  saveWorkshopCover() {
    const { dispatch, skills } = this.props;
    const { workshops } = skills;
    //TODO: check if workshops array is null
    //TODO: push only when a new workshop is created
    dispatch(
      skillActions.saveWorkshopCover(
        this.state.file,
        workshops[workshops.length - 1].id
      )
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.dispatch(skillActions.saveWorkshop(this.state.workshop));
  }

  render() {
    const { skills, session, t } = this.props;
    const levels = skills.levels;
    const categories = skills.categories;
    const isLoggedIn = session && session.isLoggedIn;
    return (
      <div>
        <div className="container">
          <div
            className="form"
            style={{
              margin: "5%"
            }}
          >
            <p className="skills-form-header">
              <Trans i18nKey="share_skill.header_0">
                Share your skill with us
              </Trans>
            </p>
            <p className="skills-text-content">
              <Trans i18nKey="share_skill.header_1">
                We are so glad you want to share your skill with us. You are
                doing a great deed to the well-being of all of us!
              </Trans>
            </p>
            <p className="skills-text-content">
              <Trans i18nKey="share_skill.header_2">
                It might take up to two days for us to process your application.
                We do this only to escape vulgarities and inappropriate posts.
                We also give feedback towards the presentation of your skill, so
                you can have more success conducting it.{" "}
              </Trans>
            </p>
            <div className="form-group">
              <p className="skills-form-title">
                <Trans i18nKey="share_skill.title_label">Title of skill</Trans>
              </p>
              <SkillInput
                name={"title"}
                onChange={this.handleChange}
                placeholder={t("share_skill.title_placeholder")}
              />
              <p className="skills-form-title">
                <Trans i18nKey="share_skill.category_label">Category</Trans>
              </p>
              <select
                value={categories.id}
                name="category_id"
                onChange={this.handleChange}
              >
                {categories.map(i => (
                  <option key={i.id} value={i.id}>
                    {i.name}
                  </option>
                ))}
              </select>
              <p className="skills-form-title">
                <Trans i18nKey="share_skill.description_label">
                  Description
                </Trans>
              </p>
              <SkillInput
                name={"description"}
                onChange={this.handleChange}
                placeholder={t("share_skill.description_placeholder")}
              />
              <p className="skills-form-title">
                <Trans i18nKey="share_skill.requriements_label">
                  Requriements
                </Trans>
              </p>
              <p>Age Recommendation</p>
              <div className="form-group row">
                <div className="col-xs-2">
                  <label htmlFor="ageFrom">
                    <Trans i18nKey="share_skill.age_from_label">Age From</Trans>
                  </label>
                  <input
                    className="form-control"
                    name="ageFrom"
                    type="text"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="col-xs-2">
                  <label htmlFor="ageTo">
                    <Trans i18nKey="share_skill.age_to_label">Age To</Trans>
                  </label>
                  <input
                    className="form-control"
                    name="ageTo"
                    type="text"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="col-xs-2">
                  <label htmlFor="level">
                    <Trans i18nKey="share_skill.recommended_label">
                      Recommended level
                    </Trans>
                  </label>
                  <select value={this.state.level} onChange={this.handleChange}>
                    {levels.map(i => (
                      <option key={i.id} value={i.id}>
                        {i.name}
                      </option>
                    ))};
                  </select>
                </div>
              </div>
              <Trans i18nKey="share_skill.additional_requirements_label">
                Additional Requirements
              </Trans>{" "}
              <SkillInput
                name={"requirements"}
                onChange={this.handleChange}
                placeholder={t(
                  "share_skill.additional_requirements_placeholder"
                )}
              />
              <p className="skills-form-title">
                <Trans i18nKey="share_skill.location_label">Location</Trans>
              </p>
              <input
                className="form-control"
                type="text"
                name="location"
                placeholder={t("share_skill.location_placeholder")}
                onChange={this.handleChange}
                style={{
                  margin: "5px"
                }}
              />
              <p className="skills-form-title">
                <Trans i18nKey="share_skill.participant_number_label">
                  Number of participants
                </Trans>
              </p>
              <input
                className="form-control"
                type="number"
                name="participants"
                placeholder={t("share_skill.participant_number_placeholder")}
                onChange={this.handleChange}
                style={{
                  margin: "5px"
                }}
              />
              <p className="skills-form-title">
                <Trans i18nKey="share_skill.price_title">Price</Trans>
              </p>
              <input
                className="form-control"
                type="number"
                name="price"
                placeholder={t("share_skill.price_placeholder")}
                onChange={this.handleChange}
                style={{
                  margin: "5px"
                }}
              />
              <button
                className="btn btn-primary"
                type="button"
                onClick={this.handleSubmit}
                disabled={!isLoggedIn}
              >
                <Trans i18nKey="share_skill.button_save_workshop">
                  Save Workshop
                </Trans>
              </button>
              <p className="skills-form-title">
                <Trans i18nKey="share_skill.date_and_time_label">
                  Date and time
                </Trans>
              </p>
              {this.state.sessions.map((session, i) => (
                <ScheduleWorkshop
                  addWorkshopSession={this.addWorkshopSession.bind(this, i)}
                  key={i}
                />
              ))}
              <div>
                <button
                  type="button"
                  className="btn btn-default btn-sm"
                  onClick={this.addRow}
                >
                  <span className="glyphicon glyphicon-plus" />
                  <Trans i18nKey="share_skill.button_add_another_date">
                    Add another day to the same course
                  </Trans>
                </button>
              </div>
              <p className="skills-form-title">Photo</p>
              <form name="form">
                <div className="form-group">
                  <input
                    type="file"
                    onChange={this.handleImageChange.bind(this)}
                  />
                  <button
                    onClick={this.saveWorkshopCover.bind(this)}
                    type="button"
                    className="btn btn-default"
                  >
                    <Trans i18nKey="share_skill.button_upload_picture">
                      Upload a cover photo
                    </Trans>
                  </button>
                </div>
              </form>
              <div className="checkbox">
                <label>
                  <input
                    type="checkbox"
                    value={Date.now()}
                    name="published_at"
                    onChange={this.handleChange}
                  />
                  <Trans i18nKey="share_skill.checkbox_agreement">
                    I herby declare that I read the the terms and conditions as
                    stated on this website and agrre with them
                  </Trans>
                </label>
              </div>
              <button className="btn btn-primary" type="button">
                <Trans i18nKey="share_skill.button_sumbit">Submit</Trans>
              </button>
            </div>
            <div>{this.state.error.message}</div>
          </div>
        </div>
      </div>
    );
  }
}

const SkillInput = props => (
  <input
    className="form-control"
    type="text"
    name={props.name}
    placeholder={props.placeholder}
    onChange={props.onChange}
    style={{ margin: "5px" }}
  />
);

const ScheduleWorkshop = props => {
  return (
    <div className="form-group row">
      <div className="col-xs-2">
        <input
          className="form-control"
          type="date"
          name="dateAndTime"
          onChange={props.addWorkshopSession}
          style={{
            margin: "5px"
          }}
        />
      </div>
      <div className="col-xs-1">
        <label htmlFor="startTime">From</label>
      </div>
      <div className="col-xs-2">
        <input
          className="form-control"
          name="startTime"
          type="text"
          placeholder="Start Time"
          onChange={props.addWorkshopSession}
        />
      </div>
      <div className="col-xs-1">
        <label htmlFor="endTime">To</label>
      </div>
      <div className="col-xs-2">
        <input
          className="form-control"
          name="endTime"
          type="text"
          placeholder="End Time"
          onChange={props.addWorkshopSession}
        />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  skills: state.skills,
  session: state.session
});

export default compose(translate("translations"), connect(mapStateToProps))(
  ShareSkill
);
