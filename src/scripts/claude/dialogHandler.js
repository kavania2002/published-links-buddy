import {
  POSSIBLE_DIALOG_OPEN_TEXTS,
  BACKDROP_ELEMENT_CLASS,
} from "./constants.js";
import {
  isValidURL,
  isCloseIconElement,
  getDialogElement,
  findUrlFromDialog,
} from "./utils.js";

let observer = null;

const reset = () => {
  console.log("Reseting...");
  if (observer) {
    console.log("Disconnecting observer");
    observer.disconnect();
    observer = null;
  }
  document.removeEventListener("click", handleDialogCloseClick);
};

const handlePublishedUrl = (mutationList) => {
  for (let mutation of mutationList) {
    const dialogElement = mutation.target;
    const url = findUrlFromDialog(dialogElement);
    if (isValidURL(url)) {
      console.log("URL found from observer", url);
      reset();
      return url;
    }
  }
  return null;
};

const handleDialogCloseClick = (event) => {
  const clickedElement = event.target;
  console.log("Element Clicked", clickedElement);
  if (
    clickedElement.classList.contains(BACKDROP_ELEMENT_CLASS) ||
    isCloseIconElement(clickedElement)
  ) {
    reset();
  }
};

export const handleDialogClick = (event) => {
  if (POSSIBLE_DIALOG_OPEN_TEXTS.includes(event.target.innerText)) {
    const dialogElement = getDialogElement();
    if (dialogElement) {
      const url = findUrlFromDialog(dialogElement);
      if (isValidURL(url)) {
        console.log("URL found", url);
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
