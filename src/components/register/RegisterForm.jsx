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
    }
  }

  signUp() {
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
            placeholder='email'
            onChange={e => this.setState({email: e.target.value})}
            style={{ margin: '5px'}}
          />
          <input
            className='form-control'
            type='text'
            placeholder='name'
            onChange={e => this.setState({name: e.target.value})}
            style={{ margin: '5px'}}
          />
          <input
            className='form-control'
            type='text'
            placeholder='surname'
            onChange={e => this.setState({surname: e.target.value})}
            style={{ margin: '5px'}}
          />
          <input
            className='form-control'
            type='date'
            placeholder='surname'
            onChange={e => this.setState({dateOfBirth: e.target.value})}
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
            onClick={() => this.signUp()}
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
