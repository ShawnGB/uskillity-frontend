import React, { Component } from "react";
import { translate, Trans } from "react-i18next";
import { Link } from "react-router-dom";
import Facebook from "react-icons/lib/fa/facebook";
import Instagram from "react-icons/lib/fa/instagram";
import logo from "../../images/logo.png";
import { openInNewTab } from "app:utils/utils";
import "./style.css";

class Footer extends Component {
  render() {
    return (
      <div className="containerFooter">
        <div className="row">
          <div className="col-sm-6 footer-block">
            <div className="row">
              <div className="col-sm-6 col-xs-6 center">
                <img src={logo} className="footer-logo" alt="" />
                <p id="copyrightFooter">
                  <Trans i18nKey="footer.copyright">
                    © 2018 Nikolovska Becker UG - u/skillity
                  </Trans>
                </p>
              </div>

              <div className="col-sm-6 col-xs-6 center">
                <div>
                  <p className="footer-item" style={{ marginLeft: "20px" }}>
                    <Trans i18nKey="footer.email">office@uskillity.de</Trans>
                  </p>
                  <div className="opacity">
                    <Facebook
                      onClick={() =>
                        openInNewTab("https://www.facebook.com/uskillity/")}
                      size={36}
                      className="footer-social-media-link"
                    />
                    <Instagram
                      onClick={() =>
                        openInNewTab("https://www.instagram.com/uskillity/")}
                      size={36}
                      className="footer-social-media-link"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 footer-block">
            <div className="row">
              <div className="col-sm-6 col-xs-6 center">
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
              <div className="col-sm-5 col-xs-5 center">
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
