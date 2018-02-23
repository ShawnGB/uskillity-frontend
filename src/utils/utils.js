import moment from "moment";
import momentTimezone from 'moment-timezone'

export const replacer = (key,value) => {
  if (value === "") return undefined;
  return value;
};

export const parseSessionDateTime = (d,f) => {
  return moment(d).format(f);
};
export const parseSessionDateToLocal = (d,f) => {
  momentTimezone.tz.setDefault();
  return momentTimezone.tz(d,f);
};
