import React, { Component } from "react";
import { translate, Trans } from "react-i18next";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import * as skillActions from "app:store/actions/skill";
import { TimePicker } from "antd";
import "antd/dist/antd.css";
import {
  parseSessionDateTime,
  validateContentByLength,
  validateContentByValue,
  validateFeesLimit
} from "app:utils/utils";
import CleverInputReader from "app:components/clever-input-reader";
import moment from "moment";
import Dropzone from "react-dropzone";
import LaddaButton, { S, ZOOM_OUT } from "react-ladda";
import Datetime from "react-datetime";
import "./style.css";
import "./react-datetime.css";
let dropzoneRef;

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
      imagePreviewUrl: "",
      loading: false,
      files: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePublish = this.handlePublish.bind(this);
    this.addEmptySession = this.addEmptySession.bind(this);
  }

  componentWillMount() {
    const { dispatch, session, history } = this.props;
    if (!session.isLoggedIn) {
      setTimeout(() => {
        dispatch({
          type: "LOGIN_REQUIRED",
          onHide: () => {
            setTimeout(() => {
              history.goBack();
            }, 1000);
          }
        });
      }, 2000);
    }
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
        dateAndTime: parseSessionDateTime(session.starts_at, "DD-MM-YYYY"),
        starts_at: parseSessionDateTime(session.starts_at),
        ends_at: parseSessionDateTime(session.ends_at),
        id: session.id
      })
    );

    sessions = this.addEmptySession(sessions);

    let workshop = { ...wrkShop };
    this.setState({
      sessions,
      workshop,
      isPublished: wrkShop.terms_accepted || false
    });
  }

  dummySession() {
    return {
      dateAndTime: parseSessionDateTime(moment(), "DD-MM-YYYY"),
      starts_at: parseSessionDateTime(
        moment()
          .startOf("day")
          .add(10, "hours")
      ),
      ends_at: parseSessionDateTime(
        moment()
          .startOf("day")
          .add(12, "hours")
      ),
      id: null
    };
  }

  addEmptySession(sessions) {
    sessions.push(this.dummySession());
    return sessions;
  }

  updateWorkshopSession = session => {
    // TODO: If nothing really changed why PUT??
    const { dispatch } = this.props;
    if (session.id && this.props.editable) {
      dispatch(
        skillActions.updateWorkshopSession(this.state.workshopId, session)
      );
    }
  };

  isAddable(session) {
    let ret = true;
    ret &= session["starts_at"] !== null;
    ret &= session["ends_at"] !== null;
    ret &= session["dateAndTime"] !== null;
    ret &= session["id"] === null;
    return ret === 1;
  }

  onChangeWorkshopSession(index, e) {
    let sessions = this.state.sessions;
    const input = e.target.name;
    sessions[index][input] = e.target.value;
    this.setState({ sessions });
  }

  onReallySaveSession(session, index) {
    const { dispatch } = this.props;
    if (this.isAddable(session)) {
      dispatch(
        skillActions.saveWorkshopSession(this.state.workshopId, session)
      );
    }
  }

  onDeleteWorkshopSession(session, index) {
    this.props.dispatch(
      skillActions.deleteWorkshopSession(this.state.workshopId, session.id)
    );
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
    this.props.dispatch(skillActions.publishWorkshop(this.state.workshopId, this.props.history));
  }

  uploadWorkshopImg(files) {
    files.forEach(file => {
      this.props.dispatch(
        skillActions.uploadWorkshopImg(file, this.state.workshopId)
      );
    });
  }

  onDrop(acceptedFiles, rejectedFiles) {
    this.setState({
      files: acceptedFiles
    });
    this.uploadWorkshopImg(acceptedFiles);
  }

  onDateAndTimeChange = (index, e, name) => {
    console.log("index", index, "e", e, "name", name);
    let timeStamp = parseSessionDateTime(e._d);
    if (name === "dateAndTime") {
      timeStamp = parseSessionDateTime(e._d, "DD-MM-YYYY");
    }
    let sessions = this.state.sessions;
    console.log("timeStamp",timeStamp);
    sessions[index][name] = timeStamp;
    this.setState({ sessions });
    this.updateWorkshopSession(sessions[index]);
  };

  render() {
    const { skills, session, t, editable } = this.props;
    const levels = skills.levels;
    const categories = skills.categories;
    const loading = skills.loading;
    const isLoggedIn = session && session.isLoggedIn;
    const workshop = this.state.workshop;
    const hasStripeConnected = session.user.stripe_provider;

    let showWsDetails = { display: "none" };
    //let showPhotos = {} // { display: "none" }; // not used yet. But can be used for showing the photo-section
    if (editable) {
      showWsDetails = {};
      //if ((this.state.sessions && this.state.sessions.length && this.state.sessions[0].id) || (workshop.images && workshop.images.length && workshop.images[0].id)) {
      //showPhotos = {};
      //}
    }
    const images = workshop.images || [];

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
          {(!hasStripeConnected) &&
            <div>
              <p className="skills-text-content">
                Please connect a stripe account in your <Link to={`/profile/${session.user.id}`}>profile</Link> first.
              </p>
            </div>
          }
          {hasStripeConnected &&
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
                    return validateContentByLength(c, 4, 32);
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
                    return validateContentByLength(c, 32, 300);
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
                      placeholder={16}
                      value={workshop.min_age}
                      onChange={this.handleChange}
                      demand={"☒"}
                      hint={""}
                      validate={c => {
                        return validateContentByValue(c, 16, 119);
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
                        return validateContentByValue(c, 14, 120);
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
                    return validateContentByLength(c, 20, 300);
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
                        return validateContentByValue(c, 1, 100);
                      }}
                      style={{ maxWidth: "100px", float: "right" }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-5">
                <div className="row  share-skill-row">
                  <div className="col-xs-4 skills-form-label">
                    <span
                      className="skills-form-title"
                      style={{
                        float: "right",
                        width: "100%",
                        textAlign: "right"
                      }}
                    >
                      <Trans i18nKey="share_skill.price_title">Price</Trans>
                    </span>
                  </div>
                  <div className="col-xs-4">
                    <CleverInputReader
                      componentClass={"input"}
                      type={"number"}
                      step={"0.01"}
                      name={"fees"}
                      placeholder={0}
                      value={workshop.fees}
                      onChange={this.handleChange}
                      demand={"Low"}
                      hint={""}
                      validate={c => {
                        return validateFeesLimit(c, 1, 250);
                      }}
                      style={{ maxWidth: "100px", float: "right" }}
                    />
                  </div>
                  <div className="col-xs-4 skills-form-label">
                    <span
                      className="skills-form-title"
                      style={{ float: "left" }}
                    >
                      Per person
                    </span>
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

            <div style={showWsDetails}>
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
                      onDeleteWorkshopSession={this.onDeleteWorkshopSession.bind(
                        this,
                        session,
                        index
                      )}
                      onReallySaveSession={this.onReallySaveSession.bind(
                        this,
                        session,
                        index
                      )}
                      onDateAndTimeChange={this.onDateAndTimeChange}
                      key={index}
                      session={session}
                      disabled={!editable}
                      fieldIndex={index}
                      t={t}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div style={showWsDetails}>
              <div>
                <div className="row share-skill-row">
                  <div className="col-xs-12 skills-form-label">
                    <span className="skills-form-title">Photo</span>
                  </div>
                  <div>
                    <div className="col-xs-11">
                      <Dropzone
                        ref={node => {
                          dropzoneRef = node;
                        }}
                        className="share-skill-dropzone"
                        onDrop={files => this.onDrop(files)}
                        disableClick
                      />
                      <aside>
                        {this.state.files.map(f => (
                          <img
                            alt={f.name}
                            key={f.name}
                            src={f.preview}
                            height={80}
                            style={{ paddingRight: "10px" }}
                          />
                        ))}
                        {images.map((img, index) => (
                          <img
                            key={index}
                            alt={index}
                            src={img}
                            height={80}
                            style={{ paddingRight: "10px" }}
                          />
                        ))}
                      </aside>
                    </div>
                    {editable && (
                      <div className="col-xs-1">
                        <LaddaButton
                          disabled={!editable}
                          onClick={() => dropzoneRef.open()}
                          className="btn-default  share-skill-ladda-button"
                          loading={loading}
                          data-color="#eee"
                          data-size={S}
                          data-style={ZOOM_OUT}
                          data-spinner-size={20}
                          data-spinner-color="#ddd"
                          data-spinner-lines={12}
                        >
                          <span
                            className="my-glyphicon glyphicon-plus"
                            style={{ color: "#9b9b9b" }}
                          />
                        </LaddaButton>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div style={showWsDetails}>
              <div>
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
                          I herby declare that I am over 16 years old and I have
                          read the the terms and conditions, privacy policy, and
                          guidelines as stated on this website and agree with
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
        }
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
  console.log("props", props);
  return (
    <div className="col-xs-12">
      <div className="row share-skill-row">
        <div className="col-xs-3">
          <Datetime
            timeFormat={false}
            utc={true}
            onChange={props.onDateAndTimeChange}
            onBlur={props.onBlur}
            disabled={props.disabled}
            value={props.session.dateAndTime}
          />
        </div>
        <div className="col-xs-1">
          <span className="skills-form-title">From</span>
        </div>
        <div className="col-xs-3">
          <TimePicker
            format={"HH:mm"}
            onChange={e =>
              props.onDateAndTimeChange(props.fieldIndex, e, "starts_at")
            }
            disabled={props.disabled}
            placeholder={props.t("share_skill.starts_at_text_placeholder")}
            defaultValue={moment()/*parse session start date to moment object*/}
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
        <div className="col-xs-1">
          {props.session.id ? (
            <button
              type="button"
              className="btn btn-default btn-sm add-session-button"
              onClick={props.onDeleteWorkshopSession}
              disabled={props.disabled}
              style={{ borderRadius: "17px" }}
            >
              <span className="my-glyphicon glyphicon-minus" />
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-default btn-sm skills-select-box add-session-button"
              onClick={props.onReallySaveSession}
              style={{ borderRadius: "17px" }}
            >
              <span
                className="my-glyphicon glyphicon-plus"
                style={{ color: "green" }}
              />
            </button>
          )}
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
