import moment from "moment";

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
      .format("HH:mm Z");
  }
};

export const parseToLocalTime = (d, t, f) => {
  let timeStamp = d + "T" + t + "Z";
  if (f !== undefined) {
    return moment.utc(timeStamp).format(f);
  } else {
    return timeStamp;
  }
};

// Let's only go with German for now
export const isGermanNavigator = () => {
  return navigator.language.includes("de");
};

export const validateContentByLength = (content, min, max) => {
  if (!content || content.length < min) {
    return { color: "red", message: "Too short" };
  } else if (content.length > max) {
    return { color: "red", message: "Too long" };
  } else {
    return { color: "green", message: "Looks good" };
  }
};

export const validateContentByValue = (content, min, max) => {
  if (!content || content < min) {
    return { color: "red", message: "☒" };
  } else if (content > max) {
    return { color: "red", message: "☒" };
  } else {
    return { color: "green", message: "☑" };
  }
};

export const validateFeesLimit = (content, min, max) => {
  if (!content || content < min) {
    return { color: "red", message: "Low" };
  } else if (content > max) {
    return { color: "red", message: "High" };
  } else {
    return { color: "green", message: "☑" };
  }
};

export const openInNewTab = url => {
  const win = window.open(url, "_blank");
  win.focus();
};
