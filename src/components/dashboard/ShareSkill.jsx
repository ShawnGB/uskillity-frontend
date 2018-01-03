import React, { Component } from 'react';
import Navbar from '../navigation/Nav';
import './style.css';

class ShareSkill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      category: '',
      description: '',
      requriements: '',
      attendees: '',
      about: '',
      participants: '',
      dateAndTime: '',
      duration: '',
      location: '',
      price: '',
      error: {
        message: ''
      }
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e){
    e.preventDefault();
    console.log('signup state', this.state);
  }

  render() {
    return(
      <div>
        <Navbar />
        <div className='container'>
          <div className='form' style={{ margin: '5%'}}>
            <p className='skills-form-header'>Share your skill with us</p>
            <p className='skills-text-content'>We are so glad you want to share your skill with us. You are doing a great deed to the well-being of all of us!</p>
            <p className='skills-text-content'>It might take up to two days for us to process your application. We do this only to escape vulgarities and inappropriate posts. We also give feedback towards the presentation of your skill, so you can have more success conducting it. </p>
            <div className='form-group'>
              <p className='skills-form-title'>Title of skill</p>
              <input
                className='form-control'
                type='text'
                name='title'
                placeholder='Be creative, but precise...'
                onChange={this.onChange}
                style={{ margin: '5px'}}
              />
              <p className='skills-form-title'>Category</p>
              <input
                className='form-control'
                type='text'
                name='category'
                placeholder='Choose from on the six categories'
                onChange={this.onChange}
                style={{ margin: '5px'}}
              />
              <p className='skills-form-title'>Description</p>
              <input
                className='form-control'
                type='text'
                name='description'
                placeholder='Explain more in detail what people can learn from your skill'
                onChange={this.onChange}
                style={{ margin: '5px'}}
              />
              <p className='skills-form-title'>Requriements</p>
              <input
                className='form-control'
                type='text'
                name='requriements'
                placeholder='ex. basic knowlegde of.. participants that bring/have'
                onChange={this.onChange}
                style={{ margin: '5px'}}
              />
              <p className='skills-form-title'>Who can attend</p>
              <input
                className='form-control'
                type='text'
                name='attendees'
                placeholder='ex. anyone above the age of 18... only kids from 7 to 12'
                onChange={this.onChange}
                style={{ margin: '5px'}}
              />
              <p className='skills-form-title'>About the instructor</p>
              <input
                className='form-control'
                type='text'
                name='about'
                placeholder='Tell us more about yourself'
                onChange={this.onChange}
                style={{ margin: '5px'}}
              />
              <p className='skills-form-title'>Number of participants</p>
              <input
                className='form-control'
                type='number'
                name='participants'
                placeholder='Number of participants'
                onChange={this.onChange}
                style={{ margin: '5px'}}
              />
              <p className='skills-form-title'>Date and time</p>
              <input
                className='form-control'
                type='date'
                name='dateAndTime'
                onChange={this.onChange}
                style={{ margin: '5px'}}
              />
              <p className='skills-form-title'>Duration</p>
              <input
                className='form-control'
                type='text'
                name='duration'
                placeholder='ex. Two days or 3 hours'
                onChange={this.onChange}
                style={{ margin: '5px'}}
              />
              <p className='skills-form-title'>Location</p>
              <input
                className='form-control'
                type='text'
                name='location'
                placeholder='Where you will be teaching your skill'
                onChange={this.onChange}
                style={{ margin: '5px'}}
              />
              <p className='skills-form-title'>Price</p>
              <input
                className='form-control'
                type='text'
                name='price'
                placeholder='How much will it cost?'
                onChange={this.onChange}
                style={{ margin: '5px'}}
              />
              <button
                className='btn btn-primary'
                type='button'
                onClick={this.handleSubmit}
              >
                Save
              </button>
            </div>
            <div>{this.state.error.message}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default ShareSkill;
