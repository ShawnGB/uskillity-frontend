import moment from "moment";
import * as modalActions from "app:store/actions/modal";

export const replacer = (key, value) => {
  if (value === "") return undefined;
  return value;
};

export const parseSessionDateTime = (d, f) => {
  if (f !== undefined) {
    return moment(d)
      .utc()
      .format(f);
  } else {
    return moment(d)
      .utc()
      .format("hh:mm");
  }
};
export const parseToLocalTime = (d, t, f) => {
  let timeStamp = d + "T" + t + "Z";
  if (f !== undefined) {
    return moment(timeStamp).format(f);
  } else {
    return timeStamp;
  }
};

// Let's only go with German for now
export const isGermanNavigator = () => {
  return navigator.language.includes("de");
};

export const showErrorModal = (dispatch, error) => {
  if (!error || (!error.title_en && !error.description_en)) {
    // TODO: Here probably we want to render a default error modal
    return;
  }

  const {
    description_en = [],
    description_de = [],
    title_en = [],
    title_de = []
  } = error;

  const texts = isGermanNavigator()
    ? {
        description: description_de[0] || "",
        title: title_de[0] || ""
      }
    : {
        description: description_en[0] || "",
        title: title_en[0] || ""
      };

  dispatch(
    modalActions.showModal("MODAL_ERROR", {
      title: texts.title,
      description: texts.description,
      hideModal: () => dispatch(modalActions.hideModal("MODAL_ERROR"))
    })
  );
};
