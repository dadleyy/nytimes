function lpad(input : string | Number, padding_char : string = "0", amt : Number) : string {
  let result = `${input}`;

  while(result.length < amt) {
    result = padding_char + result;
  }

  return result;
}

export function format(date : Date) : string {
  const year = date.getFullYear();
  const month = lpad(date.getMonth() + 1, "0", 2);
  const dd = lpad(date.getDate(), "0", 2);

  return `${year}${month}${dd}`;
}
