import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      surname: '',
      dateOfBirth: '',
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
      <div className='form-inline' style={{ margin: '5%'}}>
        <h1>Sign-up</h1>
        <div className='form-group'>
          <input
            className='form-control'
            type='email'
            name='email'
            placeholder='email'
            onChange={this.onChange}
            style={{ margin: '5px'}}
          />
          <input
            className='form-control'
            type='text'
            name='name'
            placeholder='name'
            onChange={this.onChange}
            style={{ margin: '5px'}}
          />
          <input
            className='form-control'
            type='text'
            name='surname'
            placeholder='surname'
            onChange={this.onChange}
            style={{ margin: '5px'}}
          />
          <input
            className='form-control'
            type='date'
            name='dateOfBirth'
            placeholder='surname'
            onChange={this.onChange}
            style={{ margin: '5px'}}
          />
          <input
            className='form-control'
            type='password'
            name='password'
            placeholder='password'
            onChange={this.onChange}
            style={{ margin: '5px'}}
          />
          <button
            className='btn btn-primary'
            type='button'
            onClick={this.handleSubmit}
          >
            Register
          </button>
        </div>
        <div>{this.state.error.message}</div>
        <div><Link to={'/login'}>Already a user? Sign in.</Link></div>
      </div>
    )
  }
}

export default RegisterForm;
