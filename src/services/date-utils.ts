import * as moment from "moment";

const BEFORE_START_OF_WEEK_FMT = "dddd, MMMM Do YYYY, h:mm A";
const AFTER_START_OF_WEEK_FMT = "dddd h:mm A";

function lpad(input : string | Number, padding_char : string = "0", amt : Number) : string {
  let result = `${input}`;

  while(result.length < amt) {
    result = padding_char + result;
  }

  return result;
}

export function format(date : Date | string, format_string : string = "YYYYMMDD") : string {
  const m = moment(date);

  return m.format(format_string);
}

export function calendar(date : Date | string) : string {
  const m = moment(date);
  const week = moment().startOf("week");

  return m.isBefore(week) ? m.format(BEFORE_START_OF_WEEK_FMT) : m.format(AFTER_START_OF_WEEK_FMT);
}
