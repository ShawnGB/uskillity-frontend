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
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-md-offset-1">
            <div className="panel-body">
              <form>
                <fieldset>
                  <div className="form-group">
                    <button className='btn btn-lg btn-facebook btn-block' type='button'>
                      Log in with Facebook
                    </button>
                    <label style={{ margin: '5% 0 5% 50%'}}> or </label>
                    <input className="form-control" placeholder="Email" name="email" type="text" onChange={this.onChange}></input>
                  </div>
                  <div className="form-group">
                    <input className="form-control" placeholder="Password" name="password" type="password" onChange={this.onChange}></input>
                  </div>
                  <button className='btn btn-lg btn-primary btn-block' type='button' onClick={this.handleSubmit}>
                    Log in
                  </button>
                </fieldset>
              </form>
            </div>
            <div>{this.state.error.message}</div>
            <div>
              <Link style={{ margin: '30%'}} to={'#'}>Not a user? Sign up.</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginForm;
