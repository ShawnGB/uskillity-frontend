import React from "react";
import "./style.css";

export default class Contact extends React.Component {
  render() {
    return (
      <div>
        <h2 className="about-heading">Contact</h2>
        <p className="about-content">We would love to hear from you!</p>
        <p className="about-content">
          We would love to hear from you! Do you have any questions for us?
          Suggestions perhaps? Or do you maybe want to collaborate? Send us an
          email with you query on: office@uskillity.de
        </p>
        <p className="about-content">
          If you have general questions look at our help secrtion on the left or
          check our posts on Facebook or Instagram.
        </p>
      </div>
    );
  }
}
