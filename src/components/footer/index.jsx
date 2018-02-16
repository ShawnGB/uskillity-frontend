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
      <div className="row">
        <p className="border" />
        <div className="col-sm-offset-1 col-sm-5 footer-block">
          <div className="row">
            <div className="col-sm-offset-1 col-xs-offset-1 col-sm-5 col-xs-5">
              <img src={logo} className="footer-logo float-right" alt="" />
              <p className="copyright float-right">
                <Trans i18nKey="footer.copyright">
                  © 2017 Nikolovska Becker UG - u/skillity
                </Trans>
              </p>
            </div>
            <div className="col-sm-5 col-xs-5">
              <div className="float-right">
                <p className="footer-title">
                  <Trans i18nKey="footer.connect">Connect</Trans>
                </p>
                <p className="footer-item">
                  <Trans i18nKey="footer.email">office@uskillity.de</Trans>
                </p>
                <p className="footer-item">
                  <Facebook size={30} />
                  <Instagram size={30} />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-5 footer-block">
          <div className="row">
            <div className="col-sm-offset-1 col-xs-offset-1 col-sm-5 col-xs-5">
              <p className="footer-title">
                <Trans i18nKey="footer.name">u/Skillity</Trans>
              </p>
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
              <br />
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
    );
  }
}

export default translate("translations")(Footer);
