import React from "react";
import { connect } from "react-redux";
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
    const {skills} = this.props;
    const {workshops} = skills;
      let workshop = workshops.find(w => w.id === +this.state.id);
      this.setState({workshop:workshop})
  }
  componentWillMount(){
    this.findWorkshopWithId();
  }

  render() {
    const workshop = this.state.workshop;
    return (
      <div>
        <div className="container">
          <div className="jumbotron">
            <img
              src={workshop.images[0]}
              width="100%"
              height="60%"
              alt=""
            />
          </div>
          <div className="row row-spacing">
            <div className="col-sm-6">
              <p className="workshop-name">{workshop.title}</p>
            </div>
          </div>
          <div className="row row-spacing">
            <div className="col-sm-9">
              <p className="workshop-title">Description</p>
              <p className="workshop-content">
                {workshop.description}
              </p>
              <p className="workshop-title">Recommended</p>
              <ul>
                <li>Age: {workshop.min_age}{" - "}{workshop.max_age}</li>
                <li>Level:TODO: levels are not added when submitting workshop yet.</li>
                <li>Other:</li>
                <p>Sessions:{
                    workshop.sessions.map((session,i) => (session.starts_at
                  )
                    )
                  }</p>
              </ul>
              <p className="workshop-title">Who can attend</p>
              <p className="workshop-content">
                ... Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                dolor sit
              </p>
              <p className="workshop-title">About the instructor</p>
              <p className="workshop-content">
                {workshop.about}
              </p>
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
export default connect(mapStateToProps)(Workshop);
