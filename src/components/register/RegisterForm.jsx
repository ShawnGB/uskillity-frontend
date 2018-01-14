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
        name: '',
        first_name: '',
        password: '',
        password_confirmation: '',
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
        <div className="col-sm-4 col-sm-offset-1">
          <div className="panel-body">
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input className="form-control" placeholder="email" name="email" type="text" onChange={this.onChange} value={this.state.user.email}></input>
                </div>
                <div className="form-group">
                  <input className="form-control" placeholder="name" name="name" type="text"  onChange={this.onChange} value={this.state.user.name}></input>
                </div>
                <div className="form-group">
                  <input className="form-control" placeholder="first_name" name="first_name" type="text"  onChange={this.onChange} value={this.state.user.first_name}></input>
                </div>
                <div className="form-group">
                  <input className="form-control" placeholder="password" name="password" type="password"  onChange={this.onChange} value={this.state.user.password}></input>
                </div>
                <div className="form-group">
                  <input className="form-control" placeholder="confirm password" name="password_confirmation" type="password"  onChange={this.onChange} value={this.state.user.password_confirmation}></input>
                </div>
                <div className="form-group">
                <button className='btn btn-lg btn-primary btn-block'
                  disabled={!this.state.user.email
                    || !this.state.user.name
                    || !this.state.user.first_name
                    ||!this.state.user.password ||
                    !this.state.user.password_confirmation
                  }>
                  Register
                </button>
                </div>
                <button className='btn btn-lg btn-facebook btn-block' type='button'>
                  Register with Facebook
                </button>
            </form>
          </div>
          <div>{this.state.error.message}</div>
          <div>
            <Link onClick={this.props.jumpToModal} style={{ margin: '10%'}} to={'#'}>Do you already have an account? Login here.</Link>
          </div>

        </div>
      </div>
    </div>)
  }
}

export default RegisterForm;
