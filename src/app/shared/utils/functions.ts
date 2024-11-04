export const convertCamelToSnake = (str: string) => {
  return str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1_').toLowerCase();
};

export const range = (start: any, end: any) => {
  return [...Array(end).keys()].map((i: any) => i + start);
};
