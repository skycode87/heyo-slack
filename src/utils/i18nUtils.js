/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
const matcher = function (string) {
  // eslint-disable-next-line no-useless-escape
  return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
};

export const translate = (message = "", data = {}) => {
  if (!message) {
    return;
  }

  let translated = message;

  for (const key in data) {
    translated = translated.replace(new RegExp(matcher(`{${key}}`), "g"), data[key]).replace("''", "'");
  }
  return translated;
};
