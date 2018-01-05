import React, {Component} from 'react';

class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div>
        <div className='container container-profile'>
          <div className="row">
            <div className="col-lg-3">
            <div className='img-container'>
              <img src='http://placehold.it/300x60?text=Logo' width='250' height='250' alt='' className='img-circle'/>
            </div>
            </div>
            <div className="col-lg-6">
              <div className='profile-name'>
                Name
                <input
                  className='form-control'
                  type='text'
                  name='name'
                  placeholder='Edit name'
                  onChange={this.onChange}
                  style={{ margin: '5px'}}
                />
              </div>
            </div>
          </div>
          <div className=''>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileEdit;
