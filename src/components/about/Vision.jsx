import React from "react";
import { translate, Trans } from "react-i18next";
import "./style.css";

class Vision extends React.Component {
  componentDidMount() {
    window.scrollTo(0,0);
  }
  render() {
    return (
      <div>
        <h2 className="about-heading">
          <Trans i18nKey="about.vision.header">Vision</Trans>
        </h2>
        <p className="about-content">
          <Trans i18nKey="about.vision.body_0">
            The world is influenced and shaped by how much information,
            knowledge and skills people have. Having a broader skill-set leads
            to innovation and improvement of daily life. It contributes to the
            achievement of personal fulfilment and the discovery of inner
            passions. It helps us to comprehend challenges and be more critical.
          </Trans>
        </p>
        <p className="about-content">
          <Trans i18nKey="about.vision.body_1">
            Schools and traditional educational institutions do not always teach
            us the necessary practical skills, and also neglect to modernise
            what is being thought. Furthermore, the decline of vocational
            opportunities due to technological advances can only be hindered if
            skills are being thought that are of importance to the future, and
            reflect our human emotions which cannot be automated.
          </Trans>
        </p>
        <p className="about-content">
          <Trans i18nKey="about.vision.body_2">
            We envision a world where learning and teaching are much more
            accessible, people-centred and inspiring. We are determined to
            create a community that motivates, inspires and enables people to
            easily and efficiently learn new skills and share their talents to
            help others grow.
          </Trans>
        </p>
        <p className="about-content">
          <Trans i18nKey="about.vision.body_3">
            We truly believe in people and their abilities to inspire others. We
            know that for any change in the world to happen, it is up to all of
            us to make a difference.
          </Trans>
        </p>
        <p className="about-content">
          <Trans i18nKey="about.vision.body_4">
            We are creating u/skillity to give people a platform through which
            we can influence the world for the better.
          </Trans>
        </p>
      </div>
    );
  }
}

export default translate("translations")(Vision);
