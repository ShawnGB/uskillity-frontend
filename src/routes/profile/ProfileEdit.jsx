import React, { Component } from "react";
import { translate, Trans } from "react-i18next";

class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      interest: "",
      location: ""
    };
  }

  render() {
    return (
      <div className="container container-profile">
        <div className="row">
          <div className="col-lg-3">
            <div className="img-container">
              <img
                src="http://placehold.it/250x250?text=img"
                width="250"
                height="250"
                alt=""
                className="img-circle"
              />
              <Trans i18nKey="profile.edit.upload_profile.image">
                Upload a profile picture
              </Trans>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="profile-name">
              <Trans i18nKey="profile.edit.name">Name</Trans>
            </div>
          </div>
          <div className="form-group">
            <div className="col-lg-3">
              <input
                className="form-control"
                type="text"
                name="interest"
                placeholder={
                  <Trans i18nKey="profile.edit.placeholder_profandpassion">
                    Profession or Passion
                  </Trans>
                }
                onChange={this.onChange}
                style={{ margin: "5px" }}
              />
            </div>
            <div className="col-lg-3">
              <input
                className="form-control"
                type="text"
                name="location"
                placeholder={
                  <Trans i18nKey="profile.edit.placeholder_residence">
                    Residence
                  </Trans>
                }
                onChange={this.onChange}
                style={{ margin: "5px" }}
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div class="form-group">
              <label htmlFor="about-me">About me</label>
              <textarea class="form-control" rows="5" cols="5" id="about-me" />

              <label htmlFor="about-me">Educational background</label>
              <input
                className="form-control"
                type="text"
                name="background"
                placeholder="Schools, traning, uni..."
                onChange={this.onChange}
                style={{ margin: "5px" }}
              />
            </div>
            <button
              className="btn btn-danger"
              type="button"
              onClick={this.handleSubmit}
            >
              <Trans i18nKey="profile.edit.button_save">Save</Trans>
            </button>
          </div>
        </div>
        <div className="" />
      </div>
    );
  }
}

export default translate("translations")(ProfileEdit);
