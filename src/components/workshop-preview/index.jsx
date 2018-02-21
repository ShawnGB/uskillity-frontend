import React from "react";
import { translate,Trans } from "react-i18next";
import { compose } from "redux";
import { connect } from "react-redux";
import { Link, Route } from "react-router-dom";

const WorkshopPreviewDiv = props => (
  <div style={{paddingLeft: "12px", paddingRight: "12px"}}>
    <div className="home-category-wrapper">
      <Link to={`/workshop/${props.workshop.id}`}>
        <div
          className="home-category"
          key={props.workshop.id}
          style={{ backgroundImage: `url(${props.workshop.images[0]})` }}
        />
      </Link>
    </div>
    <div className="row" style={{ marginTop: "12px" }}>
      <div className="col-xs-8">
        <p className="skill-title">{props.workshop.title}</p>
      </div>
      <div className="col-xs-4">
        {props.editable ? (
          <Button skillId={props.workshop.id} />
        ) : null}
      </div>
      <div className="col-xs-12" style={{ margin: "0px", height: "22px" }}>
        <p>
          {props.workshop.provider.first_name} {props.workshop.provider.name}
        </p>
      </div>
      <div className="col-xs-12">
        <p className="skill-price">{props.workshop.fees} €</p>
      </div>
    </div>
  </div>
);

const Button = props => (
  <Route
    render={({ history }) => (
      <button
        className="btn_edit_skill"
        type="button"
        onClick={() => {
          history.push(`/editskill/${props.skillId}`);
        }}
      >
        <Trans i18nKey="workshop.instructor.button_edit_workshop">Edit</Trans>
      </button>
    )}
  />
);


const mapStateToProps = state => ({
  session: state.session
});

export default compose(translate("translations"), connect(mapStateToProps))(
  WorkshopPreviewDiv
);
