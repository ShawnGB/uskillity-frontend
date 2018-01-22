import React, {Component} from 'react';
import Navbar from 'app:components/navigation/Nav';
import Footer from 'app:components/footer/Footer';

class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      interest: '',
      location: ''
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className='container container-profile'>
          <div className="row">
            <div className="col-lg-3">
              <div className='img-container'>
                <img src='http://placehold.it/250x250?text=img' width='250' height='250' alt='' className='img-circle'/>
                Upload a profile picture
              </div>
            </div>
              <div className="col-lg-8">
                <div className='profile-name'>
                  Name
                </div>
              </div>
            <div className='form-group'>
              <div className='col-lg-3'>
                <input
                  className='form-control'
                  type='text'
                  name='interest'
                  placeholder='Profession or Passion'
                  onChange={this.onChange}
                  style={{ margin: '5px'}}
                />
              </div>
              <div className='col-lg-3'>
                <input
                  className='form-control'
                  type='text'
                  name='location'
                  placeholder='Residence'
                  onChange={this.onChange}
                  style={{ margin: '5px'}}
                />
              </div>
            </div>
            <div className='col-lg-6'>
              <div class='form-group'>
                <label htmlFor='about-me'>About me</label>
                <textarea class='form-control' rows='5' cols='5' id='about-me'></textarea>

                <label htmlFor='about-me'>Educational background</label>
                <input
                  className='form-control'
                  type='text'
                  name='background'
                  placeholder='Schools, traning, uni...'
                  onChange={this.onChange}
                  style={{ margin: '5px'}}
                />
              </div>
              <button
                className='btn btn-danger'
                type='button'
                onClick={this.handleSubmit}
              >
                Save
              </button>
            </div>
          </div>
          <div className=''>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default ProfileEdit;
