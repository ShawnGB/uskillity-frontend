import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { service } from '../../services/service'

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: {
        message: ''
      }
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e){
    e.preventDefault();
    const { email, password } = this.state;
    if (email && password) {
      service.login(email,password);
    }
    console.log('signin', this.state);
  }

  render() {
    return(
      <div className='form-inline' style={{ margin: '5%'}}>
        <h1>Sign-in</h1>
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
            name='password'
            type='password'
            placeholder='password'
            onChange={this.onChange}
            style={{ margin: '5px'}}
          />
          <button
            className='btn btn-primary'
            type='button'
            onClick={this.handleSubmit}
          >
            Log in
          </button>
        </div>
        <div>{this.state.error.message}</div>
        <div><Link to={'/register'}>Not a user? Sign up.</Link></div>
      </div>
    )
  }
}

export default LoginForm;
