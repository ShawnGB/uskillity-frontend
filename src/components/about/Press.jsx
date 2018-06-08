import React from "react";
import { translate, Trans } from "react-i18next";
import "./style.css";

class Press extends React.Component {
  componentDidMount() {
    window.scrollTo(0,0);
  }
  render() {
    return (
      <div>
        <h2 className="about-heading">
          <Trans i18nKey="about.press.header">Press</Trans>
        </h2>
        <p className="about-content">
          <Trans i18nKey="about.press.body_0">
            Do you want to do a story on us? Have you already written about us
            and what to share?
          </Trans>
        </p>
        <p className="about-content">
          <Trans i18nKey="about.press.body_1">
            For any press related inquiries please e-mail us on
            press@uskillity.de
          </Trans>
        </p>
      </div>
    );
  }
}

export default translate("translations")(Press);
