import { CLOSE_ICON_D, DEFAULT_URL_TO_EXCLUDE } from "./constants.js";

export const isValidURL = (url) => {
  return url && url !== DEFAULT_URL_TO_EXCLUDE;
};

export const isCloseIconElement = (element) => {
  return (
    element.querySelector(`path[d="${CLOSE_ICON_D}"]`) ||
    (element.hasAttribute("d") && element.getAttribute("d") === CLOSE_ICON_D)
  );
};

export const getDialogElement = () => {
  return document.querySelector("div[role='dialog']");
};

export const findUrlFromDialog = (element) => {
  const anchorTag = element.querySelector("a");
  return anchorTag ? anchorTag.href : null;
};
