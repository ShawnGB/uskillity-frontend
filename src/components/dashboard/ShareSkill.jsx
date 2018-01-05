import React, { Component } from 'react';
import Navbar from '../navigation/Nav';
import Footer from '../../components/footer/Footer';
import './style.css';

class ShareSkill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      category: '',
      description: '',
      requriements: '',
      ageTo: '',
      ageFrom: '',
      about: '',
      participants: '',
      dateAndTime: '',
      duration: '',
      location: '',
      price: '',
      error: {
        message: ''
      },
      levels: [],
      level_id: '',
      categories: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch('https://bluecarbuncle-staging.herokuapp.com/levels.json')
    .then((resp) => resp.json())
    .then((data) => {
      console.log('DATA', data);
      let levels = [];
      data.map((i => {
        return levels.push(<option key={i.id} value={i.id}>{i.name}</option>);
      }))
      this.setState({ levels });
    });
    fetch('https://bluecarbuncle-staging.herokuapp.com/categories.json')
    .then((resp) => resp.json())
    .then((data) => {
      console.log('DATA', data);
      let categories = [];
      data.map((i => {
        return categories.push(<option key={i.id} value={i.name}>{i.name}</option>);
      }))
      this.setState({ categories });
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSelect(e) {
    this.setState({ [e.target.value]: e.target.value });
  }

  handleSubmit(e){
    e.preventDefault();
    console.log('signup state', this.state);
    fetch('https://bluecarbuncle-staging.herokuapp.com/workshops.json', {
     method: 'post',
     headers: {'Content-Type':'application/json'},
     body: JSON.stringify({
       'category': this.state.category
     })
    });
  }

  render() {
    console.log('THIS STATE: ', this.state);
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
                  {this.state.categories}
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
                <label htmlFor="ageFrom">Age From</label>
                <input className="form-control" id="ageFrom" type="text"></input>
                </div>
                <div className="col-xs-2">
                <label htmlFor="ageTo">Age To</label>
                <input className="form-control" id="ageTo" type="text"></input>
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
          <Footer />
        </div>
      </div>
    )
  }
}

export default ShareSkill;
