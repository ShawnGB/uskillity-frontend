import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {service} from '../../services/service'
import './style.css';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: '',
        password: '',
        password_confirmation: '',
        name: '',
        surname: ''
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
    this.setState({user});
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = this.state.user;
    if (user) {
      service.register(user);
    }
    console.log('signup state', this.state);
  }

  render() {
    return (<div className="container">
      <div className="row">
        <div className="col-md-4 col-md-offset-1">

          <div className="panel-body">
            <form>
              <fieldset>
                <div className="form-group">
                  <input className="form-control" placeholder="Email" name="email" type="text" onChange={this.onChange}></input>
                </div>
                <div className="form-group">
                  <input className="form-control" placeholder="Name" name="name" type="text"  onChange={this.onChange}></input>
                </div>
                <div className="form-group">
                  <input className="form-control" placeholder="Surname" name="surname" type="text"  onChange={this.onChange}></input>
                </div>
                <div className="form-group">
                  <input className="form-control" placeholder="Password" name="password" type="password"  onChange={this.onChange}></input>
                </div>
                <div className="form-group">
                  <input className="form-control" placeholder="Confirm Password" name="password_confirmation" type="password"  onChange={this.onChange}></input>
                </div>
                <button className='btn btn-lg btn-primary btn-block' type='button' onClick={this.handleSubmit}>
                  Register
                </button>
                <button className='btn btn-lg btn-facebook btn-block' type='button'>
                  Register with Facebook
                </button>
              </fieldset>
            </form>
          </div>
          <div>{this.state.error.message}</div>
          <div>
            <Link style={{ margin: '10%'}} to={'#'}>Do you already have an account? Login here.</Link>
          </div>

        </div>
      </div>
    </div>)
  }
}

export default RegisterForm;
