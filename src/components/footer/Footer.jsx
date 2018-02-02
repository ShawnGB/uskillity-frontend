import React, { Component } from "react";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import "./style.css";
import Facebook from "react-icons/lib/fa/facebook";
import Instagram from "react-icons/lib/fa/instagram";

export default class Footer extends Component {
  render() {
    return (
      <div className="row">
            <p className="border" />
        <div className="col-sm-6 footer-block">
          <div className="row">
            <div className="col-sm-6 col-xs-6">
              <img src={logo} className="footer-logo"/>
              <p className="copyright">
                © 2017 Nikolovska Becker UG - u/skillity
              </p>
            </div>
            <div className="col-sm-6 col-xs-6">
              <p className="footer-title">Connect</p>
              <p className="footer-item">office@uskillity.de</p>
              <p className="footer-item">
                <Facebook size={30} />
                <Instagram size={30} />
              </p>
            </div>
          </div>
        </div>
        <div className="col-sm-6 footer-block">
          <div className="row">
            <div className="col-sm-6 col-xs-6">
              <p className="footer-title">u/Skillity</p>
              <p className="footer-item">Vision</p>
              <p className="footer-item">Team</p>
              <p className="footer-item">Press</p>
              <p className="footer-item">Guidelines</p>
            </div>
            <div className="col-sm-6 col-xs-6">
              <br />
              <p className="footer-item">Help</p>
              <p className="footer-item">Impressum</p>
              <p className="footer-item">
                <Link to="/terms">Terms and Conditions</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
