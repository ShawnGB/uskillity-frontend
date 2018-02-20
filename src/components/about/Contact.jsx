import React from "react";
import { translate, Trans } from "react-i18next";
import "./style.css";

class Contact extends React.Component {
  render() {
    return (
      <div>
        <h2 className="about-heading">
          <Trans i18nKey="about.contact.header">Contact</Trans>
        </h2>
        <p className="about-content">
          <Trans i18nKey="about.contact.body_0">
            We would love to hear from you!
          </Trans>
        </p>
        <p className="about-content">
          <Trans i18nKey="about.contact.body_1">
            We would love to hear from you! Do you have any questions for us?
            Suggestions perhaps? Or do you maybe want to collaborate? Send us an
            email with you query on: office@uskillity.de
          </Trans>
        </p>
        <p className="about-content">
          <Trans i18nKey="about.contact.body_2">
            If you have general questions look at our help secrtion on the left
            or check our posts on Facebook or Instagram.
          </Trans>
        </p>
      </div>
    );
  }
}

export default translate("translations")(Contact);
