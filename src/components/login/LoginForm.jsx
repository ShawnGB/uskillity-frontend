import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: {
        message: ''
      }
    }
  }

  signIn() {
    console.log('signin state', this.state);
  }

  render() {
    return(
      <div className='form-inline' style={{ margin: '5%'}}>
        <h1>Sign-in</h1>
        <div className='form-group'>
          <input
            className='form-control'
            type='text'
            placeholder='email'
            onChange={e => this.setState({email: e.target.value})}
            style={{ margin: '5px'}}
          />
          <input
            className='form-control'
            type='password'
            placeholder='password'
            onChange={e => this.setState({password: e.target.value})}
            style={{ margin: '5px'}}
          />
          <button
            className='btn btn-primary'
            type='button'
            onClick={() => this.signIn()}
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
