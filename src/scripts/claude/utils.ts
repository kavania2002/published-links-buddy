import {
  CLOSE_ICON_D,
  DEFAULT_URL_TO_EXCLUDE,
  PUBLISH_ICON_D,
} from "./constants";

/**
 * Checks if a URL is valid and not the default excluded URL.
 * @param url - The URL to validate.
 * @returns True if the URL is valid, false otherwise.
 */
export const isValidURL = (url: string | null): boolean => {
  return url !== null && url !== DEFAULT_URL_TO_EXCLUDE;
};

/**
 * Determines if an element is a close icon.
 * @param element - The HTML element to check.
 * @returns True if the element is a close icon, false otherwise.
 */
export const isCloseIconElement = (element: HTMLElement): boolean => {
  if (element.hasAttribute("role") && element.getAttribute("role") === "dialog")
    return false;
  return (
    element.querySelector(`path[d="${CLOSE_ICON_D}"]`) !== null ||
    (element.hasAttribute("d") && element.getAttribute("d") === CLOSE_ICON_D)
  );
};

/**
 * Determines if an element is a publish icon.
 * @param element - The HTML element to check.
 * @returns True if the element is a publish icon, false otherwise.
 */
export const isPublishIconElement = (element: HTMLElement): boolean => {
  return (
    element.querySelector(`path[d="${PUBLISH_ICON_D}"]`) !== null ||
    (element.hasAttribute("d") && element.getAttribute("d") === PUBLISH_ICON_D)
  );
};

/**
 * Retrieves the dialog element from the DOM.
 * @returns The dialog element or null if not found.
 */
export const getDialogElement = (): HTMLElement | null => {
  return document.querySelector("div[role='dialog']");
};

/**
 * Finds a URL from a dialog element.
 * @param element - The dialog element to search.
 * @returns The URL found or null if none.
 */
export const findUrlFromDialog = (element: HTMLElement): string | null => {
  const anchorTag = element.querySelector("a");
  return anchorTag ? anchorTag.href : null;
};
