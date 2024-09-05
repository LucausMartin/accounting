/**
 * @description 格式化数字为字符串
 * @param { number | string } number 数字
 * @returns { string } 格式化后的字符串
 */
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
