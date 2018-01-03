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

  onSelect(e) {
  this.setState({ category: e.target.value });
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
                <select value={this.state.category} onChange={this.onSelect}>
                  <option value="">-- Select category --</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
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
              <p>Age Recommendation</p>
              <div className='form-group row'>
                <div className="col-xs-2">
                <label for="ageFrom">Age From</label>
                <input className="form-control" id="ageFrom" type="text"></input>
                </div>
                <div className="col-xs-2">
                <label for="ageTo">Age To</label>
                <input className="form-control" id="ageTo" type="text"></input>
                </div>
                <div className="col-xs-2">
                <label for="level">Recommended level</label>
                <select value=''>
                  <option value="">-- Level --</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                </div>
              </div>
              Additional Requirements
              <input
                className='form-control'
                type='text'
                name='add-requirements'
                placeholder='Ex. basic knowledge of ... only participants that can bring/have ...'
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
              <p className='skills-form-title'>Number of participants</p>
              <input
                className='form-control'
                type='number'
                name='participants'
                placeholder='Number of participants'
                onChange={this.onChange}
                style={{ margin: '5px'}}
              />
              <p className='skills-form-title'>Price</p>
              <input
                className='form-control'
                type='number'
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
                Save Workshop
              </button>
              <p className='skills-form-title'>Date and time</p>
              <input
                className='form-control'
                type='date'
                name='dateAndTime'
                onChange={this.onChange}
                style={{ margin: '5px'}}
              />

            </div>
            <div>{this.state.error.message}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default ShareSkill;
