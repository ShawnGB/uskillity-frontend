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
        fees: "",
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
    this.setState({ level_id: input === "level_id" ? e.target.value : "" });
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
              <div className="row share-skill-row">
                <div className="col-xs-12 skills-form-label">
                  <span className="skills-form-title">
                    <Trans i18nKey="share_skill.title_label">
                      Title of skill
                    </Trans>
                  </span>
                </div>
                <div className="col-xs-12 col-sm-8">
                  <SkillInputSingle
                    name={"title"}
                    onChange={this.handleChange}
                    placeholder={t("share_skill.title_placeholder")}
                  />
                </div>
                <div className="col-xs-12 col-sm-4">
                  <select
                    value={categories.id}
                    name="category_id"
                    onChange={this.handleChange}
                    className="skills-select-box"
                  >
                    <option>Choose a category</option>
                    {categories.map(i => (
                      <option key={i.id} value={i.id}>
                        {i.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="row share-skill-row">
                <div className="col-xs-12 skills-form-label">
                  <span className="skills-form-title">
                    <Trans i18nKey="share_skill.description_label">
                      Description
                    </Trans>
                  </span>
                </div>
                <div className="col-xs-12">
                  <SkillInputArea
                    name={"description"}
                    onChange={this.handleChange}
                    placeholder={t("share_skill.description_placeholder")}
                  />
                </div>
              </div>
              <div className="row share-skill-row">
                <div className="col-xs-12 col-sm-6">
                  <div className="row share-skill-row">
                    <div className="col-xs-5 skills-form-label">
                      <span className="skills-form-title">
                        <Trans i18nKey="share_skill.age_from_label">
                          Age Recommended
                        </Trans>
                      </span>
                    </div>
                    <div className="col-xs-7">
                      <div className="row">
                        <div className="col-xs-3">
                          <SkillInputSingle
                            name={"ageFrom"}
                            onChange={this.handleChange}
                          />
                        </div>
                        <div className="col-xs-6 skills-form-label">
                          <span className="skills-form-title">
                            <Trans i18nKey="share_skill.age_to_label">To</Trans>
                          </span>
                        </div>
                        <div className="col-xs-3">
                          <SkillInputSingle
                            name={"ageTo"}
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xs-12 col-sm-6">
                  <div className="row share-skill-row">
                    <div className="col-xs-6 skills-form-label">
                      <span className="skills-form-title">
                        <Trans i18nKey="share_skill.recommended_label">
                          Recommended level
                        </Trans>
                      </span>
                    </div>

                    <div className="col-xs-6">
                      <select
                        name="level_id"
                        value={this.state.level}
                        onChange={this.handleChange}
                        className="skills-select-box"
                      >
                        <option>Choose Level</option>
                        {levels.map(i => (
                          <option key={i.id} value={i.id}>
                            {i.name}
                          </option>
                        ))};
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row share-skill-row">
                <div className="col-xs-12 skills-form-label">
                  <span className="skills-form-title">
                    <Trans i18nKey="share_skill.additional_requirements_label">
                      Additional Requirements
                    </Trans>{" "}
                  </span>
                </div>
                <div className="col-xs-12">
                  <SkillInputArea
                    name={"requirements"}
                    onChange={this.handleChange}
                    placeholder={t(
                      "share_skill.additional_requirements_placeholder"
                    )}
                  />
                </div>
              </div>
              <div className="row share-skill-row">
                <div className="col-xs-12 skills-form-label">
                  <span className="skills-form-title">
                    <Trans i18nKey="share_skill.location_label">Location</Trans>
                  </span>
                </div>
                <div className="col-xs-12">
                  <SkillInputSingle
                    name={"location"}
                    onChange={this.handleChange}
                    placeholder={t("share_skill.location_placeholder")}
                  />
                </div>
              </div>
              <div className="row share-skill-row">
                <div className="col-xs-12 col-sm-6">
                  <div className="row  share-skill-row">
                    <div className="col-xs-9 skills-form-label">
                      <span className="skills-form-title">
                        <Trans i18nKey="share_skill.participant_number_label">
                          Number of participants
                        </Trans>
                      </span>
                    </div>
                    <div className="col-xs-3">
                      <SkillInputSingle
                        name={"participants"}
                        type="number"
                        onChange={this.handleChange}
                        placeholder={t(
                          "share_skill.participant_number_placeholder"
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-xs-12 col-sm-6">
                  <div className="row  share-skill-row">
                    <div className="col-xs-4 skills-form-label">
                      <span className="skills-form-title">
                        <Trans i18nKey="share_skill.price_title">Price</Trans>
                      </span>
                    </div>
                    <div className="col-xs-4">
                      <SkillInputSingle
                        name={"fees"}
                        type="number"
                        onChange={this.handleChange}
                        placeholder={t("share_skill.price_placeholder")}
                      />
                    </div>
                    <div className="col-xs-4 skills-form-label">
                      <span className="skills-form-title">Per person</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row share-skill-row">
                <div className="col-xs-12">
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={this.handleSubmit}
                    disabled={!isLoggedIn}
                    style={{ float: "right" }}
                  >
                    <Trans i18nKey="share_skill.button_save_workshop">
                      Save Workshop
                    </Trans>
                  </button>
                </div>
              </div>
              <span className="skills-form-title">
                <Trans i18nKey="share_skill.date_and_time_label">
                  Date and time
                </Trans>
              </span>
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
              <span className="skills-form-title">Photo</span>
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

const SkillInputArea = props => (
  <textarea
    rows="4"
    className="form-control"
    type={props.type || "text"}
    name={props.name}
    placeholder={props.placeholder}
    onChange={props.onChange}
    style={{ borderRadius: "0px", borderColor: "#9b9b9b" }}
  />
);

const SkillInputSingle = props => (
  <input
    className="form-control"
    type={props.type || "text"}
    name={props.name}
    placeholder={props.placeholder}
    onChange={props.onChange}
    style={{ borderRadius: "0px", borderColor: "#9b9b9b" }}
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
