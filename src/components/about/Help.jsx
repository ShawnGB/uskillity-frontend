import React from "react";
import { translate, Trans } from "react-i18next";
import "./style.css";

class Help extends React.Component {
  componentDidMount() {
    window.scrollTo(0,0);
  }
  render() {
    return (
      <div>
        <h2 className="about-heading">
          <Trans i18nKey="about.help.header">Help</Trans>
        </h2>
        <p className="about-content">
          <Trans i18nKey="about.help.body_0">For Instructors</Trans>
        </p>
        <p className="about-content">
          <Trans i18nKey="about.help.body_1">
            1. What should my qualifications be?
          </Trans>
        </p>
        <p className="about-content">
          <Trans i18nKey="about.help.body_2">
            Sometimes we master an ability just by mere life-experience.
            Therefore u/skillity is open to any qualifications as long as you
            feel like you can contribute to the learning community by sharing
            your skill. We are confident in peoples qualities but urge
            Instructors to be transparent and communicate their background to
            the learners.
          </Trans>
        </p>
        <p className="about-content">
          <Trans i18nKey="about.help.body_3">
            1. What should my qualifications be?
          </Trans>
        </p>
        <p className="about-content">
          <Trans i18nKey="about.help.body_4">
            You can cancel your workshop/tutoring up to 72h before the due date.
            If you comply with the adequate conditions money will be sent back
            to the learners and we will cover the fee for the payment provider.
            If by any chance you do not comply with the adequate conditions or
            cancel shortly before the workshop/tutoring-or after the 72h, then
            you have to cover the fee for the payment provider.
          </Trans>
        </p>
        <p className="about-content">
          <Trans i18nKey="about.help.body_5">
            What do I do if a student behaves inappropriately?
          </Trans>
        </p>
        <p className="about-content">
          <Trans i18nKey="about.help.body_6">
            If by any chance you encounter a student who is being vulgar,
            inappropriate, discriminatory or breaks any of u/skillity’s
            guidelines, please report that individual to us and we will take
            appropriate measures.
          </Trans>
        </p>
        <p className="about-content">
          <Trans i18nKey="about.help.body_7">
            When do I receive my payment?
          </Trans>
        </p>
        <p className="about-content">
          <Trans i18nKey="about.help.body_8">
            The payment is going to be send to you right after the conclusion of
            your workshop.
          </Trans>
        </p>
        <p className="about-content">
          <Trans i18nKey="about.help.body_9">
            I want to conduct a workshop only if its fully booked. What do I do?
          </Trans>
        </p>
        <p className="about-content">
          <Trans i18nKey="about.help.body_10">
            You have to state in the description that you only plan to conduct
            the workshop if it’s fully booked. In this case you have to make
            your decision 72h before the workshop is to take place otherwise,
            you have to cover the cost for the payment provider.
          </Trans>
        </p>
        <p className="about-content">
          <Trans i18nKey="about.help.body_11">
            Can I announce a workshop without stating the location yet?
          </Trans>
        </p>
        <p className="about-content">
          <Trans i18nKey="about.help.body_12">
            If you are still searching for a location, but you want to announce
            your workshop so people can plan their attendance, you can state in
            the description that the exact address will be announced in a later
            time. However, you do have to name the city the workshop is taking
            place.
          </Trans>
        </p>
        <p className="about-content">
          <Trans i18nKey="about.help.body_13">
            Tip from us: It is always better to have the location as early as
            possible because for some learners the decision to book a workshop
            might lie in the location itself.
          </Trans>
        </p>
        <p className="about-content">
          <Trans i18nKey="about.help.body_14">For Learners</Trans>
        </p>
        <p className="about-content">
          <Trans i18nKey="about.help.body_15">
            I bought a ticket but I cannot attend. What do I do?
          </Trans>
        </p>
        <p className="about-content">
          <Trans i18nKey="about.help.body_16">
            You have a chance to give the ticket back a week before the Workshop
            due date. Then you get your money back, but unfortunately without
            the fees for the payment provider. If you have to cancel the
            workshop after the due date you unfortunately will not be eligible
            for a refund, but you can always give your ticket to your best
            friend.
          </Trans>
        </p>
        <p className="about-content">
          <Trans i18nKey="about.help.body_17">
            How can I ask the Instructor something?
          </Trans>
        </p>
        <p className="about-content">
          <Trans i18nKey="about.help.body_18">
            If you have any question about the workshop/tutoring or instructor
            you can contact us on office@uskillity.de and we will inform you of
            everything that you need to know.
          </Trans>
        </p>
        <p className="about-content">
          <Trans i18nKey="about.help.body_19">
            I wasn’t satisfied by a workshop or instructor, what shall I do?
          </Trans>
        </p>
        <p className="about-content">
          <Trans i18nKey="about.help.body_20">
            We are very sorry you weren’t satisfied by a workshop or Instructor.
            You can write a review and also give the Instructor a rating. If you
            feel that the workshop or Instructor was inappropriate or he/she was
            breaking any u/skillity guidelines, please report the individual to
            us and we will take appropriate measures.
          </Trans>
        </p>
        <p className="about-content">
          <Trans i18nKey="about.help.body_21">
            What methods of payment does u/skillity accept?
          </Trans>
        </p>
        <p className="about-content">
          <Trans i18nKey="about.help.body_22">
            The payment methods we offer at the moment are Credit Card, Sofort
            Überweisung and Giro Pay.
          </Trans>
        </p>
        <p className="about-content">
          <Trans i18nKey="about.help.body_23">
            How is the price determined for the workshops?
          </Trans>
        </p>
        <p className="about-content">
          <Trans i18nKey="about.help.body_24">
            The price is determined by the workshop Instructors themselves.
            u/skillity does not give any limitations or guidelines of how much a
            workshop or tutoring should cost.
          </Trans>
        </p>
        <p className="about-content">
          <Trans i18nKey="about.help.body_25">
            What happens if a workshop is canceled?
          </Trans>
        </p>
        <p className="about-content">
          <Trans i18nKey="about.help.body_26">
            We are very sorry that the workshop/tutoring got canceled. If a
            workshop is canceled you get your money back and will be informed if
            the workshop will take place on another date.
          </Trans>
        </p>
        <p className="about-content">
          <Trans i18nKey="about.help.body_27">
            If you have any further questions please e-mail us on
            office@uskillity.de
          </Trans>
        </p>
      </div>
    );
  }
}

export default translate("translations")(Help);
