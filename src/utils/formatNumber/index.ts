export const formatNumberToString = (number: number | string): string => {
  if (String(number) === '-0' || String(number) === '-') {
    return '00.00';
  }
  if (Number(number) === 0) {
    return '00.00';
  } else {
    return String(number);
  }
};
