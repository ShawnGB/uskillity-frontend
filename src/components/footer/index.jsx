import React, { Component } from "react";
import { translate, Trans } from "react-i18next";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import "./style.css";
import Facebook from "react-icons/lib/fa/facebook";
import Instagram from "react-icons/lib/fa/instagram";

class Footer extends Component {
  render() {
    return (
      <div className="container">
      <div className="row">
        <p className="border" />
        <div className="col-sm-6 footer-block">
          <div className="row">
            <div className="col-sm-6 col-xs-6">
              <img src={logo} className="footer-logo" alt="" />
              <p>
                <Trans i18nKey="footer.copyright">
                  © 2017 Nikolovska Becker UG - u/skillity
                </Trans>
              </p>
            </div>
            <div className="col-sm-6 col-xs-6">
              <div>
                <p className="footer-item" style={{marginLeft: "24px"}}>
                  <Trans i18nKey="footer.email">office@uskillity.de</Trans>
                </p>
                  <Facebook size={30}  style={{  margin: "10px 20px" }}/>
                  <Instagram size={30} style={{  margin: "10px 20px" }}/>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 footer-block">
          <div className="row">
            <div className="col-sm-6 col-xs-6">
              <p className="footer-item">
                <Trans i18nKey="footer.vision">Vision</Trans>
              </p>
              <p className="footer-item">
                <Trans i18nKey="footer.team">Team</Trans>
              </p>
              <p className="footer-item">
                <Trans i18nKey="footer.press">Press</Trans>
              </p>
              <p className="footer-item">
                <Trans i18nKey="footer.guidelines">Guidelines</Trans>
              </p>
            </div>
            <div className="col-sm-5 col-xs-5">
              <p className="footer-item">
                <Trans i18nKey="footer.help">Help</Trans>
              </p>
              <p className="footer-item">
                <Trans i18nKey="footer.impressum">Impressum</Trans>
              </p>
              <p className="footer-item">
                <Link to="/terms">
                  <Trans i18nKey="footer.termsandconditions">
                    Terms and Conditions
                  </Trans>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default translate("translations")(Footer);
