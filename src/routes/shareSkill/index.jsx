import React, { Component } from "react";
import { translate, Trans } from "react-i18next";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as skillActions from "app:store/actions/skill";
import { parseSessionDateTime } from "app:utils/utils";
import CleverInputReader from "app:components/clever-input-reader";
import "./style.css";

class ShareSkill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workshopId: this.props.match ? +this.props.match.params.id : null,
      workshop: {},
      isPublished: false,
      sessions: [],
      error: {
        message: ""
      },
      level_id: "",
      file: {},
      imagePreviewUrl: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePublish = this.handlePublish.bind(this);
    this.addRow = this.addRow.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    if (this.state.workshopId) {
      dispatch(skillActions.fetchWorkshop(this.state.workshopId));
    }
    this.findWorkshopToEdit();
    dispatch(skillActions.fetchLevels());
    dispatch(skillActions.fetchCategories());
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.workshopId) {
      return;
    }

    const workshop = nextProps.skills.workshops.find(
      w => w.id === this.state.workshopId
    );

    if (workshop && workshop !== this.state.workshop) {
      this.findWorkshopToEdit(workshop);
    }
  }

  findWorkshopToEdit(fetchedWorkshop) {
    if (!this.props.editable) {
      return;
    }
    let wrkShop = {};
    if (fetchedWorkshop) {
      wrkShop = fetchedWorkshop;
    } else {
      const { workshops } = this.props.skills;
      wrkShop = workshops.find(w => w.id === +this.state.workshopId) || {};
    }
    let sessions = [];
    wrkShop.sessions.forEach(session =>
      sessions.push({
        dateAndTime: parseSessionDateTime(session.starts_at, "YYYY-MM-DD"),
        starts_at: parseSessionDateTime(session.starts_at),
        ends_at: parseSessionDateTime(session.ends_at),
        id: session.id
      })
    );
    let workshop = { ...wrkShop };
    this.setState({
      sessions,
      workshop,
      isPublished: wrkShop.terms_accepted || false
    });
  }

  addRow() {
    let sessions = this.state.sessions;
    // TODO:
    // If the user added already one "empty" session don't let him/her add more
    //if (!sessions[sessions.length - 1].id) {
    //return;
    //}
    sessions.push({
      dateAndTime: null,
      starts_at: null,
      ends_at: null,
      id: null
    });
    this.setState({ sessions });
  }

  updateWorkshopSession(session, index) {
    // TODO: If nothing really changed why PUT??
    const { dispatch } = this.props;
    if (session.id && this.props.editable) {
      dispatch(
        skillActions.updateWorkshopSession(this.state.workshopId, session)
      );
    } else if (this.addingSessionCompleted(session)) {
      dispatch(
        skillActions.saveWorkshopSession(this.state.workshopId, session)
      );
    }
  }

  addingSessionCompleted(session) {
    let ret = true;
    ret &= session["starts_at"] !== null;
    ret &= session["ends_at"] !== null;
    ret &= session["dateAndTime"] !== null;
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
    let value = e.target.value;
    if (input === "terms_accepted") {
      value = e.target.checked;
    }
    workshop[input] = value;
    this.setState({ workshop });
    this.setState({ level_id: input === "level_id" ? e.target.value : "" }); // TODO: why is it ouside workshop object
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
    const { dispatch } = this.props;
    dispatch(
      skillActions.saveWorkshopCover(this.state.file, this.state.workshopId)
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    if (this.props.editable) {
      const workshop = { ...this.state.workshop, terms_accepted: null };
      dispatch(skillActions.updateWorkshop(workshop, this.state.workshopId));
    } else {
      dispatch(
        skillActions.saveWorkshop(this.state.workshop, this.props.history)
      );
    }
  }

  handlePublish(e) {
    e.preventDefault();
    if (!this.state.workshop.terms_accepted) {
      return;
    }
    this.props.dispatch(skillActions.publishWorkshop(this.state.workshopId));
  }

  validateContentByLength(content, min, max) {
    if (!content || content.length < min) {
      return { color: "red", message: "Too short" };
    } else if (content.length > max) {
      return { color: "red", message: "Too long" };
    } else {
      return { color: "green", message: "Looks good" };
    }
  }

  validateContentByValue(content, min, max) {
    if (!content || content < min) {
      return { color: "red", message: "☒" };
    } else if (content > max) {
      return { color: "red", message: "☒" };
    } else {
      return { color: "green", message: "☑" };
    }
  }

  validateFeesLimit(content, min, max) {
    if (!content || content < min) {
      return { color: "red", message: "Low" };
    } else if (content > max) {
      return { color: "red", message: "High" };
    } else {
      return { color: "green", message: "☑" };
    }
  }

  render() {
    const { skills, session, t, editable } = this.props;
    const levels = skills.levels;
    const categories = skills.categories;
    const isLoggedIn = session && session.isLoggedIn;
    const workshop = this.state.workshop;

    return (
      <div>
        <div className="form">
          <p className="skills-form-header">
            <Trans i18nKey="share_skill.header_0">
              Share your skill with us
            </Trans>
          </p>
          <p className="skills-text-content">
            <Trans i18nKey="share_skill.header_1">
              We are so glad you want to share your skill with us. You are doing
              a great deed to the well-being of all of us!
            </Trans>
          </p>
          <p className="skills-text-content">
            <Trans i18nKey="share_skill.header_2">
              It might take up to two days for us to process your application.
              We do this only to escape vulgarities and inappropriate posts. We
              also give feedback towards the presentation of your skill, so you
              can have more success conducting it.{" "}
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
                <CleverInputReader
                  componentClass={"input"}
                  type={"input"}
                  name={"title"}
                  placeholder={t("share_skill.title_placeholder")}
                  value={workshop.title || ""}
                  onChange={this.handleChange}
                  demand={"Too short"}
                  hint={""}
                  validate={c => {
                    return this.validateContentByLength(c, 4, 32);
                  }}
                />
              </div>
              <div className="col-xs-12 col-sm-4">
                <select
                  name="category_id"
                  onChange={this.handleChange}
                  className="skills-select-box"
                  value={workshop.category_id}
                >
                  <option>Choose a category</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name}
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
                <CleverInputReader
                  componentClass={"textarea"}
                  type={"input"}
                  name={"description"}
                  placeholder={t("share_skill.description_placeholder")}
                  value={workshop.description || ""}
                  onChange={this.handleChange}
                  demand={"Too short"}
                  hint={""}
                  validate={c => {
                    return this.validateContentByLength(c, 20, 300);
                  }}
                />
              </div>
            </div>
            <div className="row share-skill-row">
              <div className="col-xs-12 col-sm-7">
                <div className="row share-skill-row">
                  <div className="col-xs-3 skills-form-label">
                    <span className="skills-form-title">
                      <Trans i18nKey="share_skill.age_from_label">
                        Age Recommended
                      </Trans>
                    </span>
                  </div>
                  <div className="col-xs-3">
                    <CleverInputReader
                      componentClass={"input"}
                      type={"number"}
                      name={"min_age"}
                      placeholder={13}
                      value={workshop.min_age}
                      onChange={this.handleChange}
                      demand={"☒"}
                      hint={""}
                      validate={c => {
                        return this.validateContentByValue(c, 0, 120);
                      }}
                      style={{ maxWidth: "70px", float: "left" }}
                    />
                  </div>
                  <div className="col-xs-3 skills-form-label">
                    <span className="skills-form-title">
                      <Trans i18nKey="share_skill.age_to_label">To</Trans>
                    </span>
                  </div>
                  <div className="col-xs-3">
                    <CleverInputReader
                      componentClass={"input"}
                      type={"number"}
                      name={"max_age"}
                      placeholder={120}
                      value={workshop.max_age}
                      onChange={this.handleChange}
                      demand={"☒"}
                      hint={""}
                      validate={c => {
                        return this.validateContentByValue(c, 0, 120);
                      }}
                      style={{ maxWidth: "70px", float: "left" }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-5">
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
                          selected={i.id === workshop.level_id ? true : null}
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
                <CleverInputReader
                  componentClass={"textarea"}
                  type={"input"}
                  name={"additional_requirements"}
                  placeholder={t(
                    "share_skill.additional_requirements_placeholder"
                  )}
                  value={workshop.additional_requirements || ""}
                  onChange={this.handleChange}
                  demand={"Too short"}
                  hint={""}
                  validate={c => {
                    return this.validateContentByLength(c, 20, 300);
                  }}
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
                  name={"full_address"}
                  onChange={this.handleChange}
                  placeholder={t("share_skill.location_placeholder")}
                  value={workshop.full_address}
                />
              </div>
            </div>
            <div className="row share-skill-row">
              <div className="col-xs-12 col-sm-7">
                <div className="row  share-skill-row">
                  <div className="col-xs-9 skills-form-label">
                    <span className="skills-form-title">
                      <Trans i18nKey="share_skill.participant_number_label">
                        Number of participants
                      </Trans>
                    </span>
                  </div>
                  <div className="col-xs-3">
                    <CleverInputReader
                      componentClass={"input"}
                      type={"number"}
                      name={"maximum_workshop_registration_count"}
                      placeholder={0}
                      value={workshop.maximum_workshop_registration_count}
                      onChange={this.handleChange}
                      demand={"☒"}
                      hint={""}
                      validate={c => {
                        return this.validateContentByValue(c, 0, 120);
                      }}
                      style={{ maxWidth: "100px", float: "right" }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-5">
                <div className="row  share-skill-row">
                  <div className="col-xs-4 skills-form-label">
                    <span className="skills-form-title" style={{float: "right", width: "100%", textAlign:"right"}}>
                      <Trans i18nKey="share_skill.price_title">Price</Trans>
                    </span>
                  </div>
                  <div className="col-xs-4">
                    <CleverInputReader
                      componentClass={"input"}
                      type={"number"}
                      name={"fees"}
                      placeholder={0}
                      value={workshop.fees}
                      onChange={this.handleChange}
                      demand={"Low"}
                      hint={""}
                      validate={c => {
                        return this.validateFeesLimit(c, 0, 250);
                      }}
                      style={{ maxWidth: "100px", float: "right" }}
                    />
                  </div>
                  <div className="col-xs-4 skills-form-label">
                    <span className="skills-form-title" style={{float:"left"}}>Per person</span>
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
              <div>
                <div className="row share-skill-row">
                  <div className="col-xs-12 skills-form-label">
                    <span className="skills-form-title">
                      <Trans i18nKey="share_skill.date_and_time_label">
                        Date and time
                      </Trans>
                    </span>
                  </div>
                  {this.state.sessions.map((session, index) => (
                    <ScheduleWorkshop
                      onChange={this.onChangeWorkshopSession.bind(this, index)}
                      onBlur={this.updateWorkshopSession.bind(
                        this,
                        session,
                        index
                      )}
                      key={index}
                      session={session}
                      disabled={!editable}
                    />
                  ))}
                  <div className="col-xs-3">
                    <div className="row share-skill-row">
                      <div className="col-xs-12">
                        <button
                          type="button"
                          className="btn btn-default btn-sm skills-select-box add-session-button"
                          onClick={this.addRow}
                          disabled={!editable}
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
                          disabled={!editable}
                          onChange={this.handleImageChange.bind(this)}
                        />
                        <button
                          onClick={this.saveWorkshopCover.bind(this)}
                          type="button"
                          className="btn btn-default btn-sm skills-select-box"
                          disabled={!editable}
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
                {!this.state.isPublished && (
                  <div>
                    <div className="checkbox">
                      <label>
                        <input
                          type="checkbox"
                          value={workshop.terms_accepted || false}
                          name="terms_accepted"
                          disabled={!editable}
                          onChange={this.handleChange}
                        />
                        <Trans i18nKey="share_skill.checkbox_agreement">
                          I herby declare that I read the the terms and
                          conditions as stated on this website and agrre with
                          them
                        </Trans>
                      </label>
                    </div>
                    <button
                      disabled={!editable}
                      className="btn btn-primary"
                      type="button"
                      onClick={this.handlePublish}
                    >
                      <Trans i18nKey="share_skill.button_sumbit">Submit</Trans>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div>{this.state.error.message}</div>
        </div>
      </div>
    );
  }
}

const SkillInputSingle = props => (
  <input
    className="form-control"
    type={props.type || "text"}
    name={props.name}
    placeholder={props.placeholder}
    onBlur={props.onBlur}
    onChange={props.onChange}
    value={props.value || ""}
    style={{ borderRadius: "0px", borderColor: "#9b9b9b" }}
    disabled={props.disabled}
  />
);

const ScheduleWorkshop = props => {
  return (
    <div className="col-xs-9">
      <div className="row share-skill-row">
        <div className="col-xs-3">
          <SkillInputSingle
            name={"dateAndTime"}
            type="date"
            onChange={props.onChange}
            onBlur={props.onBlur}
            disabled={props.disabled}
            value={props.session.dateAndTime}
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
            disabled={props.disabled}
            placeholder="Start Time"
            value={props.session.starts_at}
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
            disabled={props.disabled}
            placeholder="End Time"
            value={props.session.ends_at}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  skills: state.skills,
  session: state.session
});

export default compose(
  withRouter,
  translate("translations"),
  connect(mapStateToProps)
)(ShareSkill);
