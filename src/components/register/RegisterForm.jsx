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
            placeholder='email'
            onChange={this.onChange}
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
