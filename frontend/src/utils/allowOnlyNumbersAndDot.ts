export const allowOnlyNumbersAndDot = (number: string) => {
  var rgx = /^[0-9]*\.?[0-9]*$/;
  return rgx.test(number);
};
