import React, { Component } from 'react';

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
      <div className='form' style={{ margin: '5%'}}>
        <h1>Share your skill with us</h1>
        <p>Share your skill text</p>
        <div className='form-group'>
          <h4>Title of skill</h4>
          <input
            className='form-control'
            type='text'
            name='title'
            placeholder='Be creative, but precise...'
            onChange={this.onChange}
            style={{ margin: '5px'}}
          />
          <h4>Category</h4>
          <input
            className='form-control'
            type='text'
            name='category'
            placeholder='Choose from on the six categories'
            onChange={this.onChange}
            style={{ margin: '5px'}}
          />
          <h4>Description</h4>
          <input
            className='form-control'
            type='text'
            name='description'
            placeholder='Explain more in detail what people can learn from your skill'
            onChange={this.onChange}
            style={{ margin: '5px'}}
          />
          <h4>Requriements</h4>
          <input
            className='form-control'
            type='text'
            name='requriements'
            placeholder='ex. basic knowlegde of.. participants that bring/have'
            onChange={this.onChange}
            style={{ margin: '5px'}}
          />
          <h4>Who can attend</h4>
          <input
            className='form-control'
            type='text'
            name='attendees'
            placeholder='ex. anyone above the age of 18... only kids from 7 to 12'
            onChange={this.onChange}
            style={{ margin: '5px'}}
          />
          <h4>About the instructor</h4>
          <input
            className='form-control'
            type='text'
            name='about'
            placeholder='Tell us more about yourself'
            onChange={this.onChange}
            style={{ margin: '5px'}}
          />
          <h4>Number of participants</h4>
          <input
            className='form-control'
            type='number'
            name='participants'
            placeholder='Number of participants'
            onChange={this.onChange}
            style={{ margin: '5px'}}
          />
          <h4>Date and time</h4>
          <input
            className='form-control'
            type='date'
            name='dateAndTime'
            onChange={this.onChange}
            style={{ margin: '5px'}}
          />
          <h4>Duration</h4>
          <input
            className='form-control'
            type='text'
            name='duration'
            placeholder='ex. Two days or 3 hours'
            onChange={this.onChange}
            style={{ margin: '5px'}}
          />
          <h4>Location</h4>
          <input
            className='form-control'
            type='text'
            name='location'
            placeholder='Where you will be teaching your skill'
            onChange={this.onChange}
            style={{ margin: '5px'}}
          />
          <h4>Price</h4>
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
    )
  }
}

export default ShareSkill;
