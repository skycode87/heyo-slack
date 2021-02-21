export const parseStrToJSON = (jsonString = "", defaultValue = {}) => {
  let parsedJson = defaultValue;

  if (Object.keys(jsonString).length > 0) {
    try {
      parsedJson = JSON.parse(jsonString);
    } catch {
      parsedJson = defaultValue;
    }
  }

  return parsedJson;
};
