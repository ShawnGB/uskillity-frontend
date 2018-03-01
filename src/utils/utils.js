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
