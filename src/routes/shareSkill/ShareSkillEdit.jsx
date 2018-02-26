import React, { Component } from "react";
import { translate, Trans } from "react-i18next";
import { compose } from "redux";
import { connect } from "react-redux";
import * as skillActions from "app:store/actions/skill";
import { parseSessionDateTime } from "app:utils/utils";
import "./style.css";

class ShareSkillEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workshopId: this.props.match.params.id,
      workshop: {
        title: "",
        category_id: "",
        description: "",
        additional_requirements: "",
        max_age: "",
        min_age: "",
        maximum_workshop_registration_count: "",
        dateAndTime: "",
        full_address: "",
        fees: "",
        published_at: ""
      },
      sessions: [],
      error: {
        message: ""
      },
      level_id: "",
      file: {},
      imagePreviewUrl: "",
      initialWorkshop: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addRow = this.addRow.bind(this);
  }

  componentWillMount() {
    const { user_workshops } = this.props.profile;
    let initialWorkshop =
      user_workshops.find(w => w.id === +this.state.workshopId) || {};
    this.setState({ initialWorkshop });
  }

  componentDidMount() {
    let sessions = [];
    this.state.initialWorkshop.sessions.map(session =>
      sessions.push({
        dateAndTime: parseSessionDateTime(session.starts_at, "YYYY-MM-DD"),
        starts_at: parseSessionDateTime(session.starts_at),
        ends_at: parseSessionDateTime(session.ends_at)
      })
    );

    this.setState({ sessions });
  }

  addRow() {
    //let sessions = this.state.initialWorkshop.sessions;
    let sessions = this.state.sessions;
    // TODO:
    // If the user added already one "empty" session don't let him/her add more
    //if (!sessions[sessions.length - 1].id) {
    //return;
    //}
    sessions.push({
      dateAndTime: null,
      starts_at: null,
      ends_at: null
    });
    this.setState({ sessions });
  }

  updateWorkshopSession = (session, index) => {
    // TODO: If nothing really changed why PUT??
    const { dispatch } = this.props;
    let workshopId = this.state.workshopId;
    if (session.id) {
      dispatch(skillActions.updateWorkshopSession(workshopId, session));
    } else if (this.addingSessionCompleted(session)) {
      dispatch(skillActions.saveWorkshopSession(workshopId, session));
    }
  };

  addingSessionCompleted(session) {
    let ret = true;
    ret &= session["starts_at"] !== undefined;
    ret &= session["ends_at"] !== undefined;
    ret &= session["dateAndTime"] !== undefined;
    return ret === 1;
  }

  onChangeWorkshopSession(index, e) {
    let sessions = this.state.sessions;
    const input = e.target.name;
    sessions[index][input] = e.target.value;
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
    this.props.dispatch(
      skillActions.updateWorkshop(this.state.workshop, this.state.workshopId)
    );
  }

  render() {
    const { skills, session, t } = this.props;
    const initialWorkshop = this.state.initialWorkshop;
    const sessions = this.state.sessions;
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
                    defaultValue={initialWorkshop.title}
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
                    <option disabled>Choose a category</option>
                    {categories.map(i => (
                      <option
                        selected={
                          i.id === initialWorkshop.category_id ? true : null
                        }
                        key={i.id}
                        value={i.id}
                      >
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
                    defaultValue={initialWorkshop.description}
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
                            name={"min_age"}
                            onChange={this.handleChange}
                            defaultValue={initialWorkshop.min_age}
                          />
                        </div>
                        <div className="col-xs-6 skills-form-label">
                          <span className="skills-form-title">
                            <Trans i18nKey="share_skill.age_to_label">To</Trans>
                          </span>
                        </div>
                        <div className="col-xs-3">
                          <SkillInputSingle
                            name={"max_age"}
                            onChange={this.handleChange}
                            defaultValue={initialWorkshop.max_age}
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
                          <option
                            selected={
                              i.id === initialWorkshop.level_id ? true : null
                            }
                            key={i.id}
                            value={i.id}
                          >
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
                    name={"additional_requirements"}
                    onChange={this.handleChange}
                    placeholder={t(
                      "share_skill.additional_requirements_placeholder"
                    )}
                    defaultValue={initialWorkshop.additional_requirements}
                  />
                </div>
              </div>
              <div className="row share-skill-row">
                <div className="col-xs-12 skills-form-label">
                  <span className="skills-form-title">
                    <Trans i18nKey="share_skill.full_address_label">
                      full_address
                    </Trans>
                  </span>
                </div>
                <div className="col-xs-12">
                  <SkillInputSingle
                    name={"full_address"}
                    onChange={this.handleChange}
                    placeholder={t("share_skill.full_address_placeholder")}
                    defaultValue={initialWorkshop.full_address}
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
                        name={"maximum_workshop_registration_count"}
                        type="number"
                        onChange={this.handleChange}
                        placeholder={t(
                          "share_skill.participant_number_placeholder"
                        )}
                        defaultValue={
                          initialWorkshop.maximum_workshop_registration_count
                        }
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
                        defaultValue={initialWorkshop.fees}
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
                    className="btn btn-primary uski-button-style"
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

              <div>
                <div className="row share-skill-row">
                  <div className="col-xs-12 skills-form-label">
                    <span className="skills-form-title">
                      <Trans i18nKey="share_skill.date_and_time_label">
                        Date and time
                      </Trans>
                    </span>
                  </div>
                  {sessions.map((session, index) => (
                    <ScheduleWorkshop
                      onChange={this.onChangeWorkshopSession.bind(this, index)}
                      onBlur={this.updateWorkshopSession.bind(
                        this,
                        session,
                        index
                      )}
                      key={index}
                      session={session}
                    />
                  ))}
                  <div className="col-xs-3">
                    <div className="row share-skill-row">
                      <div className="col-xs-12">
                        <button
                          type="button"
                          className="btn btn-default btn-sm skills-select-box add-session-button"
                          onClick={this.addRow}
                          style={{ borderRadius: "17px" }}
                        >
                          <span
                            className="glyphicon glyphicon-plus"
                            style={{ fontSize: "15px" }}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row share-skill-row">
                  <div className="col-xs-12 skills-form-label">
                    <span className="skills-form-title">Photo</span>
                  </div>
                  <div className="col-xs-12">
                    <form name="form">
                      <div className="form-group">
                        <SkillInputSingle
                          type="file"
                          onChange={this.handleImageChange.bind(this)}
                        />
                        <button
                          onClick={this.saveWorkshopCover.bind(this)}
                          type="button"
                          className="btn btn-default btn-sm skills-select-box"
                          style={{ width: "140px", float: "right" }}
                        >
                          <Trans i18nKey="share_skill.button_upload_picture">
                            Upload a cover photo
                          </Trans>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="checkbox">
                  <label>
                    <input
                      type="checkbox"
                      value={Date.now()}
                      name="published_at"
                      onChange={this.handleChange}
                    />
                    <Trans i18nKey="share_skill.checkbox_agreement">
                      I herby declare that I read the the terms and conditions
                      as stated on this website and agrre with them
                    </Trans>
                  </label>
                </div>
                <button className="btn btn-primary" type="button">
                  <Trans i18nKey="share_skill.button_sumbit">Submit</Trans>
                </button>
              </div>
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
    defaultValue={props.defaultValue}
    style={{ borderRadius: "0px", borderColor: "#9b9b9b" }}
  />
);

const SkillInputSingle = props => (
  <input
    className="form-control"
    type={props.type || "text"}
    name={props.name}
    placeholder={props.placeholder}
    onBlur={props.onBlur}
    onChange={props.onChange}
    defaultValue={props.defaultValue}
    style={{ borderRadius: "0px", borderColor: "#9b9b9b" }}
  />
);

const ScheduleWorkshop = props => {
  const hasDefaultValue = () => {
    return Object.keys(props.session).length > 0;
  };
  console.log("props.session", props.session);
  return (
    <div className="col-xs-9">
      <div className="row share-skill-row">
        <div className="col-xs-3">
          <SkillInputSingle
            name={"dateAndTime"}
            type="date"
            onChange={props.onChange}
            onBlur={props.onBlur}
            defaultValue={hasDefaultValue() ? props.session.dateAndTime : null}
          />
        </div>
        <div className="col-xs-1">
          <span className="skills-form-title">From</span>
        </div>
        <div className="col-xs-3">
          <SkillInputSingle
            name={"starts_at"}
            type="time"
            onChange={props.onChange}
            onBlur={props.onBlur}
            placeholder="Start Time"
            defaultValue={hasDefaultValue() ? props.session.starts_at : null}
          />
        </div>
        <div className="col-xs-1">
          <span className="skills-form-title">To</span>
        </div>
        <div className="col-xs-3">
          <SkillInputSingle
            name={"ends_at"}
            type="time"
            onChange={props.onChange}
            onBlur={props.onBlur}
            placeholder="End Time"
            defaultValue={hasDefaultValue() ? props.session.ends_at : null}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  skills: state.skills,
  session: state.session,
  profile: state.profile
});

export default compose(translate("translations"), connect(mapStateToProps))(
  ShareSkillEdit
);
