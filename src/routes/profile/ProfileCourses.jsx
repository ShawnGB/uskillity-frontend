import React from 'react';
import * as service from 'app:utils/service';

class ProfileCourses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.userId,
      user_workshops: []
    }
  }

  componentDidMount() {
    fetch(service.getServerEndpoint(`/users/${this.state.id}/workshops`)).then((resp) => {
      if (!resp.ok) {
        // TODO: send back to home page
      }
      return resp.json();
    }).then((user_workshops) => {
      this.setState({user_workshops});
      console.log("user workshops", user_workshops);
    });
  }
  render() {
    return (<div>
      <div className='container container-profile'>
        <p className='skills-heading'>My Shared Courses</p>
        <div className='row'>
          {
            this.state.user_workshops.map((workshop, i) => (<div className='col-sm-3' key={i}>
              <img src={workshop.main_image} width='250' height='180' alt=''/>
              <div className='skill-content'>
                <p className='skill-category'>Arts & Crafts</p>
                <p className='skill-title'>{workshop.title}</p>
                <p className='skill-author'>{workshop.provider.first_name}{workshop.provider.name} </p>
                <p className='skill-price'>14 €</p>
              </div>
            </div>))
          }
        </div>
      </div>
    </div>);
  }
}

export default ProfileCourses;
