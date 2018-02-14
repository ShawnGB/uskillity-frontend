import React from "react";
import { translate, Trans } from "react-i18next";
import "./style.css";

class TermsConditions extends React.Component {
  render() {
    return (
      <div>
        <h2 className="about-heading">
          {" "}
          <Trans i18nKey="about.termsandconditions.header">
            Terms & Conditions
          </Trans>{" "}
        </h2>
        <p className="about-content">
          <Trans i18nKey="about.termsandconditions.body_0">
            Please read these Terms of Service carefully as they contain
            important information about your legal rights, remedies and
            obligations. By accessing or using the u/skillity Platform, you
            agree to comply with and be bound by these Terms of Service.
          </Trans>
        </p>
      </div>
    );
  }
}

export default translate("translations")(TermsConditions);
