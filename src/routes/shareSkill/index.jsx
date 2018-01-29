import React, { Component } from "react";
import { connect } from "react-redux";
import Navbar from "app:components/navigation/Nav";
import Footer from "app:components/footer/Footer";
import * as service from "app:utils/service";
import "./style.css";

class ShareSkill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //todo: wrap these in workshop object
      workshop: {
        title: "",
        category_id: "",
        description: "",
        requriements: "",
        ageTo: "",
        ageFrom: "",
        about: "",
        participants: "",
        dateAndTime: "",
        duration: "",
        location: "",
        price: "",
        published_at: "", //TODO:ask sandeep if we need to pass published_at
      },
      sessions: [{}],
      error: {
        message: ""
      },
      levels: [],
      level_id: "",
      categories: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addRow = this.addRow.bind(this);
  }

  componentDidMount() {
    fetch(service.getServerEndpoint("/levels.json"))
      .then(resp => resp.json())
      .then(data => {
        console.log("DATA LEVELS", data);
        let levels = [];
        data.map(i => {
          return levels.push(
            <option key={i.id} value={i.id}>
              {i.name}
            </option>
          );
        });
        this.setState({ levels });
      });
    fetch(service.getServerEndpoint("/categories.json"))
      .then(resp => resp.json())
      .then(data => {
        console.log("DATA CATAGORIES", data);
        let categories = [];
        data.map(i => {
          return categories.push(
            <option key={i.id} value={i.id}>
              {i.name}
            </option>
          );
        });
        this.setState({ categories });
      });
  }

  addRow(){
    var sessions = this.state.sessions;
    sessions.push({});
    this.setState({
      sessions
    })
  }

  captureSession(i,e){
    let sessions = this.state.sessions;
    const input = e.target.name;
    sessions[i][input] = e.target.value;
    this.setState({
      sessions
    });
    console.log("session",this.state);
  }

  onChange(e) {
    const workshop = this.state.workshop;
    const input = e.target.name;
    workshop[input] = e.target.value;
    this.setState({ workshop });
    console.log("workshop",workshop);
  }

  onSelect(e) {
    const input = e.target.name;
    const workshop = this.state.workshop;
    workshop[input] = e.target.value;
    this.setState({ workshop });
  }

  handleSubmit(e) {
    const { session } = this.props;
    const isLoggedIn = session && session.isLoggedIn;
    if (!isLoggedIn) {
      // TODO: if user not log in the return to home page
      return;
    }

    e.preventDefault();
    console.log("signup state", this.state);
    fetch(service.getServerEndpoint("/workshops.json"), {
      method: "post",
      headers: service.getRequestHeaders(),
      body: JSON.stringify({
        category: this.state.workshop.category,
        workshop: this.state.workshop
      })
    });
  }


  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <div className="form" style={{ margin: "5%" }}>
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
              <input
                className="form-control"
                type="text"
                name="title"
                placeholder="Be creative, but precise..."
                onChange={this.onChange}
                style={{ margin: "5px" }}
              />
              <p className="skills-form-title">Category</p>
              <select
                value={this.state.categories.id}
                name="category_id"
                onChange={this.onSelect}
              >
                {this.state.categories}
              </select>
              <p className="skills-form-title">Description</p>
              <input
                className="form-control"
                type="text"
                name="description"
                placeholder="Explain more in detail what people can learn from your skill"
                onChange={this.onChange}
                style={{ margin: "5px" }}
              />
              <p className="skills-form-title">Requriements</p>
              <p>Age Recommendation</p>
              <div className="form-group row">
                <div className="col-xs-2">
                  <label htmlFor="ageFrom">Age From</label>
                  <input
                    className="form-control"
                    id="ageFrom"
                    type="text"
                    onChange={this.onChange}
                  />
                </div>
                <div className="col-xs-2">
                  <label htmlFor="ageTo">Age To</label>
                  <input
                    className="form-control"
                    id="ageTo"
                    type="text"
                    onChange={this.onChange}
                  />
                </div>
                <div className="col-xs-2">
                  <label htmlFor="level">Recommended level</label>
                  <select value={this.state.level} onChange={this.onSelect}>
                    {this.state.levels}
                  </select>
                </div>
              </div>
              Additional Requirements
              <input
                className="form-control"
                type="text"
                name="add-requirements"
                placeholder="Ex. basic knowledge of ... only participants that can bring/have ..."
                onChange={this.onChange}
                style={{ margin: "5px" }}
              />
              <p className="skills-form-title">Location</p>
              <input
                className="form-control"
                type="text"
                name="location"
                placeholder="Where you will be teaching your skill"
                onChange={this.onChange}
                style={{ margin: "5px" }}
              />
              <p className="skills-form-title">Number of participants</p>
              <input
                className="form-control"
                type="number"
                name="participants"
                placeholder="Number of participants"
                onChange={this.onChange}
                style={{ margin: "5px" }}
              />
              <p className="skills-form-title">Price</p>
              <input
                className="form-control"
                type="number"
                name="price"
                placeholder="How much will it cost?"
                onChange={this.onChange}
                style={{ margin: "5px" }}
              />
              <button
                className="btn btn-primary"
                type="button"
                onClick={this.handleSubmit}
              >
                Save Workshop
              </button>
              <p className="skills-form-title">Date and time</p>
              {
                this.state.sessions.map((session,i)=>(
                  <ScheduleWorkshop captureSession={this.captureSession.bind(this,i)} key={i}/>
                ))
              }
                <div>
                  <button type="button" className="btn btn-default btn-sm" onClick={this.addRow}>
                    <span className="glyphicon glyphicon-plus" />Add another day
                    to the same course
                  </button>
                </div>
              <p className="skills-form-title">Photo</p>
              <button type="button" className="btn btn-default">
                Upload a cover photo
              </button>
              <div className="checkbox">
                <label>
                  <input type="checkbox" value={Date.now()} name="published_at" onChange={this.onChange}/>I herby declare that I read
                  the the terms and conditions as stated on this website and
                  agrre with them
                </label>
              </div>
              <button className="btn btn-primary" type="button">
                Submit
              </button>
            </div>
            <div>{this.state.error.message}</div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

const ScheduleWorkshop = props => {
  return <div className="form-group row">
    <div className="col-xs-2">
      <input
        className="form-control"
        type="date"
        name="dateAndTime"
        onChange={props.captureSession}
        style={{ margin: "5px" }}
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
        onChange={props.captureSession}
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
        onChange={props.captureSession}
      />
    </div>

  </div>
}

const mapStateToProps = state => ({
  session: state.session
});

export default connect(mapStateToProps)(ShareSkill);
