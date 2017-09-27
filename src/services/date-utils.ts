function lpad(input : string | Number, padChar : string = "0", amt : Number) : string {
  let result = `${input}`;

  while(result.length < amt) {
    result = padChar + result;
  }

  return result;
}

export function format(date : Date) : string {
  const year = date.getFullYear();
  const month = lpad(date.getMonth(), "0", 2);
  const dd = lpad(date.getDate(), "0", 2);

  return `${year}${month}${dd}`;
}
