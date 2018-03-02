import React from "react";
import { translate, Trans } from "react-i18next";
import "./style.css";

class Team extends React.Component {
  render() {
    return (
      <div>
        <h2 className="about-heading">
          <Trans i18nKey="about.team.header">Team</Trans>
        </h2>
        <p className="about-content">
          <Trans i18nKey="about.team.body_0">
            For both Shawn and Irina, sitting for hours behind a desk in a
            classroom was one of the most tedious endeavours. They both found
            inspiration from activities they got to do away from the educational
            institutions, in environments that let them express their
            individuality and amplify their creativity.
          </Trans>
        </p>
        <p className="about-content">
          <Trans i18nKey="about.team.body_1">
            Shawn’s motivation was triggered by his difficulty resonating with
            the traditional school system. Rebelling against classical learning,
            he impelled into the professional world without a fancy diploma in
            his pocket and experienced obstacles finding ways to learn practical
            skills away from educational institutions. Moreover, he struggled to
            find personal fulfilment and passion in the current
            overly-structured and conservative educational environment.
          </Trans>
        </p>
        <p className="about-content">
          <Trans i18nKey="about.team.body_2">
            Irina followed a more conventional road and completed her master
            studies in Berlin. Dealing with the bureaucratic and institutional
            educational system, she comprehended the meaning of background
            privilege as well as the setbacks of the traditional model of
            teaching. Even more so, she was disheartened by the lack of soft as
            well as contemporary skills one could learn in the current
            educational system.
          </Trans>
        </p>
        <p className="about-content">
          <Trans i18nKey="about.team.body_3">
            Shawn and Irina’s different experiences and backgrounds brought a
            common thread in light. They both share a love for learning but they
            do not resonate with the way knowledge is stimulated and passed on.
            They both believe that knowledge shouldn’t be a privilege, people
            should be able to experience many different skills in order to find
            their passion. Learning should be tailored to the individual’s
            habits and affinities.
          </Trans>
        </p>
        <p className="about-content">
          <Trans i18nKey="about.team.body_4">
            Taking that notion in hand and combining it with a burning
            entrepreneurial sensation, Shawn and Irina decided to embark on a
            journey and build an environment where learning and teaching a skill
            is open for everyone, where learning and teaching is individualised,
            where a strong community of people willing to learn and share what
            they know strive.
          </Trans>
        </p>
        <p className="about-content">
          <Trans i18nKey="about.team.body_5">
            Sandeep & Andreas are not only responsible for the programming and
            technical side of u/skillity, but have also been a great support to
            the development of the overall project. Sandeep’s expertise on
            complex algorithms, and data analysis, and Andreas’ proficiency in
            turning an idea to a business model, with code infrastructure and
            agile culture, brought u/skillity from a mere vision to a structured
            realisation.
          </Trans>
        </p>
        <p className="about-content">
          <Trans i18nKey="about.team.body_6">
            Coming from more open education in the creative field, Marija has
            had the opportunity to learn in an environment where experimentation
            and exploration of individual skills were encouraged. Having the
            opportunity to explore a variety of mediums of visual communication
            helped her to gain better understanding of her strengths and
            weaknesses. To her, having the opportunity to learn in a community
            of people who are passionate about what they do is an indispensable
            experience and inspiration in life.
          </Trans>
        </p>
        <p className="about-content">
          <Trans i18nKey="about.team.body_7">
            Eugene wishes someone has taught him how to successfully chase and
            capture flies. Growing up as a single kitty has deprived him from
            the opportunity to learn from other cats, so he behaves like a
            human. He wishes that one day he will have the opportunity to learn
            how to become a hunter so he can feel more comfortable in his cat
            skin.
          </Trans>
        </p>
      </div>
    );
  }
}

export default translate("translations")(Team);
