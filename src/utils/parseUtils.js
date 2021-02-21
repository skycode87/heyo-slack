export const parseBoolean = (value) => {
  let booleanValue = false;

  if (typeof value === "boolean") {
    booleanValue = value;
  } else if (typeof value === "string") {
    booleanValue = value.toLowerCase() === "true" || value.toLowerCase() === "1";
  } else if (typeof value === "number" && value) {
    booleanValue = value !== 0;
  }

  return booleanValue;
};
