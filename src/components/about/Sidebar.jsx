import React from "react";
import { Link } from "react-router-dom";
import { translate, Trans } from "react-i18next";

class Sidebar extends React.Component {
  render() {
    return (
      <div>
        <ul className="nav nav-stacked">
          <li className="active">
            <Link to="/vision">
              <Trans i18nKey="about.sidebar.team">Vision</Trans>
            </Link>
          </li>
          <li>
            <Link to="/team">
              <Trans i18nKey="about.sidebar.team">Team</Trans>
            </Link>
          </li>
          <li>
            <Link to="/contact">
              <Trans i18nKey="about.sidebar.contact">Contact</Trans>
            </Link>
          </li>
          <li>
            <Link to="/press">
              <Trans i18nKey="about.sidebar.press">Press</Trans>
            </Link>
          </li>
          <li>
            <Link to="/help">
              <Trans i18nKey="about.sidebar.help">Help</Trans>
            </Link>
          </li>
          <li>
            <Link to="/guidelines">
              <Trans i18nKey="about.sidebar.guidelines">Guidelines</Trans>
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default translate("translations")(Sidebar);
