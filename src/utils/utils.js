import moment from "moment";

export const replacer = (key, value) => {
  if (value === "") return undefined;
  return value;
};

export const parseSessionDateTime = (d) => {
  console.log(
    "formatted:",
    moment(d)
      .utc()
      .format("HH:MM")
  );
  return moment(d).utc().format("HH:MM");
};
export const parseToLocalTime = (d, t, f) => {
  let timeStamp = d + "T" + t + "Z";
  if (f !== undefined) {
    return moment(timeStamp).format(f);
  } else {
    return timeStamp;
  }
};
