import { sendUrlToBackground } from "../common/utils";
import {
  POSSIBLE_DIALOG_OPEN_TEXTS,
  BACKDROP_ELEMENT_CLASS,
} from "./constants";
import {
  isValidURL,
  isCloseIconElement,
  getDialogElement,
  findUrlFromDialog,
} from "./utils";

let observer: MutationObserver | null = null;

/**
 * Resets the observer and removes event listeners.
 */
const reset = (): void => {
  console.log("Resetting...");
  if (observer) {
    console.log("Disconnecting observer");
    observer.disconnect();
    observer = null;
  }
  document.removeEventListener("click", handleDialogCloseClick);
};

/**
 * Handles mutations to find a published URL.
 * @param mutationList - List of mutations observed.
 * @returns The found URL or null.
 */
const handlePublishedUrl = (mutationList: MutationRecord[]): string | null => {
  for (const mutation of mutationList) {
    const dialogElement = mutation.target as HTMLElement;
    const url = findUrlFromDialog(dialogElement);
    if (isValidURL(url)) {
      console.log("URL found from observer", url);
      sendUrlToBackground(url);
      reset();
      return url;
    }
  }
  return null;
};

/**
 * Handles click events to close the dialog.
 * @param event - The mouse event triggered by a click.
 */
const handleDialogCloseClick = (event: MouseEvent): void => {
  const clickedElement = event.target as HTMLElement;
  console.log("Element Clicked", clickedElement);
  if (
    clickedElement.classList.contains(BACKDROP_ELEMENT_CLASS) ||
    isCloseIconElement(clickedElement)
  ) {
    reset();
  }
};

/**
 * Handles click events to open the dialog.
 * @param event - The mouse event triggered by a click.
 */
export const handleDialogClick = (event: MouseEvent): void => {
  const clickedElement = event.target as HTMLElement;
  if (POSSIBLE_DIALOG_OPEN_TEXTS.includes(clickedElement.innerText)) {
    const dialogElement = getDialogElement();
    if (dialogElement) {
      const url = findUrlFromDialog(dialogElement);
      if (isValidURL(url)) {
        console.log("URL found", url);
        sendUrlToBackground(url);
      } else {
        observer = new MutationObserver((mutationList) =>
          handlePublishedUrl(mutationList)
        );
        observer.observe(dialogElement, { childList: true, subtree: true });
        document.addEventListener("click", handleDialogCloseClick);
      }
    }
  }
};
