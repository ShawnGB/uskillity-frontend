import React, { Component } from "react";
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
    const { skills, session } = this.props;
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
            <p className="skills-form-header">Share your skill with us</p>
            <p className="skills-text-content">
              We are so glad you want to share your skill with us. You are doing
              a great deed to the well-being of all of us!
            </p>
            <p className="skills-text-content">
              It might take up to two days for us to process your application.
              We do this only to escape vulgarities and inappropriate posts. We
              also give feedback towards the presentation of your skill, so you
              can have more success conducting it.{" "}
            </p>
            <div className="form-group">
              <p className="skills-form-title">Title of skill</p>
              <SkillInput
                name={"title"}
                onChange={this.handleChange}
                placeholder={"Be creative, but precise..."}
              />
              <p className="skills-form-title">Category</p>
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
              <p className="skills-form-title">Description</p>
              <SkillInput
                name={"description"}
                onChange={this.handleChange}
                placeholder={
                  "Explain more in detail what people can learn from your skill"
                }
              />
              <p className="skills-form-title">Requriements</p>
              <p>Age Recommendation</p>
              <div className="form-group row">
                <div className="col-xs-2">
                  <label htmlFor="ageFrom">Age From</label>
                  <input
                    className="form-control"
                    name="ageFrom"
                    type="text"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="col-xs-2">
                  <label htmlFor="ageTo">Age To</label>
                  <input
                    className="form-control"
                    name="ageTo"
                    type="text"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="col-xs-2">
                  <label htmlFor="level">Recommended level</label>
                  <select value={this.state.level} onChange={this.handleChange}>
                    {levels.map(i => (
                      <option key={i.id} value={i.id}>
                        {i.name}
                      </option>
                    ))};
                  </select>
                </div>
              </div>
              Additional Requirements
              <SkillInput
                name={"requirements"}
                onChange={this.handleChange}
                placeholder={
                  "Ex. basic knowledge of ... only participants that can bring/have ..."
                }
              />
              <p className="skills-form-title">Location</p>
              <input
                className="form-control"
                type="text"
                name="location"
                placeholder="Where you will be teaching your skill"
                onChange={this.handleChange}
                style={{
                  margin: "5px"
                }}
              />
              <p className="skills-form-title">Number of participants</p>
              <input
                className="form-control"
                type="number"
                name="participants"
                placeholder="Number of participants"
                onChange={this.handleChange}
                style={{
                  margin: "5px"
                }}
              />
              <p className="skills-form-title">Price</p>
              <input
                className="form-control"
                type="number"
                name="price"
                placeholder="How much will it cost?"
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
                Save Workshop
              </button>
              <p className="skills-form-title">Date and time</p>
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
                  <span className="glyphicon glyphicon-plus" />Add another day
                  to the same course
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
                    Upload a cover photo
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
                  />I herby declare that I read the the terms and conditions as
                  stated on this website and agrre with them
                </label>
              </div>
              <button className="btn btn-primary" type="button">
                Submit
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

export default connect(mapStateToProps)(ShareSkill);
