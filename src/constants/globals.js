/* eslint-disable no-else-return */
const moment = require("moment");

export const globals = Object.freeze({
  BACKEND: "http://localhost:5000",
  CLUUF: "cluuf",
  PAGE_ONE: "one",
  PAGE_TWO: "two",
  PAGE_MAIN: "main",
});

export const routes = Object.freeze({
  BUCKET: `${globals.BACKEND}/uploads`,
  API_BUCKET: `${globals.BACKEND}/bucket`,
});

export const numbers = Object.freeze({
  ZERO: "0",
  ONE: "1",
  TWO: "2",
  THREE: "3",
  FOUR: "4",
  FIVE: "5",
  SIX: "6",
  SEVEN: "7",
  EIGHT: "8",
  NINE: "9",
  TEN: "10",
});

export const priceFormat = (text) => `$ ${text}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const dateFormat = (date) => moment(date).format("L");

export const dateFormat2 = (date) => moment(date).format("LLLL");

export const isFutureDate = (date) => {
  if (moment(date).format("YYYY/MM/DD") >= moment().format("YYYY/MM/DD")) {
    return true;
  }
  return false;
};

export const isRangeDate = (desde, hasta) => {
  if (
    moment(desde).format("YYYY/MM/DD") <= moment().format("YYYY/MM/DD") &&
    moment(hasta).format("YYYY/MM/DD") >= moment().format("YYYY/MM/DD")
  ) {
    return true;
  }
  return false;
};

export const validateImage = (img = "") => {
  console.log(img);
  const imageparts = String(img).split("/");

  if (img.indexOf("lospatioshb") > -1) {
    return img;
  }

  if (img.indexOf("public") > -1) {
    console.log(`${routes.BUCKET}/${imageparts[3]}/${imageparts[4]}`, img);
    return `${routes.BUCKET}/${imageparts[3]}/${imageparts[4]}`;
  } else if (img.indexOf("picture") > -1) {
    return img;
  }

  if (img.length > 1) {
    //  const instanceId = localStorage.getItem("instanceId");

    return `${routes.BUCKET}/${imageparts[3]}/${imageparts[4]}`;
  }
  return "https://autoclinicaelchino.com/wp-content/uploads/2019/01/default-image.png";
};

export const validateImageBucket = (img = "", instanceId = null) => {
  console.log(img);

  if (img.indexOf("lospatioshb") > -1) {
    return img;
  }

  if (img.indexOf("picture") > -1) {
    return `${routes.BUCKET}/${instanceId}/${img}`;
  } else if (img.indexOf("picture") > -1) {
    return img;
  }

  return "https://autoclinicaelchino.com/wp-content/uploads/2019/01/default-image.png";
};
