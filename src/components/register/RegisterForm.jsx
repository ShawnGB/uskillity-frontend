import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { service } from '../../services/service'

class RegisterForm extends Component{
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: '',
        password: '',
        password_confirmation:'',
        name: '',
        surname: '',
        dateOfBirth: '',
      },
      error: {
        message: ''
      }
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(e) {
    const input = e.target.name;
    const user = this.state.user;
    user[input] = e.target.value;
    this.setState({ user });
  }

  handleSubmit(e){
    e.preventDefault();
    const user = this.state.user;
    if (user) {
      service.register(user);
    }
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
            placeholder='dob'
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
          <input
            className='form-control'
            type='password'
            name='password_confirmation'
            placeholder='confirm password'
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
