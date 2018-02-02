import React from 'react';
import Sidebar from './Sidebar';
import * as service from 'app:utils/service'
import './style.css';

class Workshop extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      id:this.props.match.params.id,
      workshop : {},
    }
  }
  componentDidMount(){
    // TODO: this is unnecessary api call, handle it through state manager or pass from parent component
    fetch(service.getServerEndpoint(`/workshops/${this.state.id}.json`))
    .then((resp) => {
      if (!resp.ok) {
        // TODO: send back to home page
      }
      return resp.json();
    }).then((data) => {
      this.setState({workshop:data})
      console.log("after set up",this.state.data)
    }
    );
  }
  render() {
    return	(
      <div>
        <div className='container'>
          <div className='jumbotron'>
            <img
              src={this.state.workshop.main_image}
              width ='100%'
              height ='60%'
              alt='' />
          </div>
          <div className='row row-spacing'>
            <div className='col-sm-6'>
              <p className='workshop-name'>
                {this.state.workshop.title}
              </p>
            </div>
          </div>

          <div className='row row-spacing'>
            <div className='col-sm-3 col-sm-offset-9'>
              <Sidebar />
            </div>
            <div className='col-sm-8'>
              <p className='workshop-title'>Description</p>
              <p className='workshop-content'>
                {this.state.workshop.description}
              </p>
            </div>
          </div>
          <div className='row row-spacing'>
            <div className='col-sm-8'>
              <p className='workshop-title'>Requirements</p>
              <p className='workshop-content'>
                ... Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              </p>
            </div>
          </div>
          <div className='row row-spacing'>
            <div className='col-sm-8'>
              <p className='workshop-title'>
                Who can attend
              </p>
              <p className='workshop-content'>
                ... Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              </p>
            </div>
          </div>
          <div className='row row-spacing'>
            <div className='col-sm-8'>
              <p className='workshop-title'>
                About the instructor
              </p>
              <p className='workshop-content'>
                ... Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Workshop;
