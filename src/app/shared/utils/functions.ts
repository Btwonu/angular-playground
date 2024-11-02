export const convertCamelToSnake = (str: string) => {
  return str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1_').toLowerCase();
};
