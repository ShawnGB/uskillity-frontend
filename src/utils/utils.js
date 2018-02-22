import moment from "moment";

export const replacer = (key,value) => {
  if (value === "") return undefined;
  return value;
};

export const parseSessionDateTime = (d,f) => {
  return moment(d).format(f);
};
