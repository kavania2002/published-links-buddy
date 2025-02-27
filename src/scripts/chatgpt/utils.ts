import {
  CREATE_LINK_BUTTON,
  CREATE_LINK_BUTTON_ATTRIBUTE,
  NEW_CHAT_HEADING,
  PUBLISHED_CHAT_HEADING,
  SHARE_BUTTON,
  UPDATE_LINK_BUTTON,
} from "./constants";

const findButtonByText = (element: HTMLElement, text: string): boolean => {
  const MAX_DEPTH = 3;
  let currentElement: HTMLElement | null = element;
  let depth = 0;

  while (currentElement && depth < MAX_DEPTH) {
    if (currentElement.innerText === text) {
      const parentElement = currentElement.parentElement;
      return (
        currentElement.tagName === "BUTTON" ||
        parentElement?.tagName === "BUTTON"
      );
    }
    currentElement = currentElement.parentElement;
    depth++;
  }
  return false;
};

const findActiveDialog = (): HTMLElement | undefined => {
  return Array.from(
    document.querySelectorAll<HTMLElement>("div[role='dialog']")
  ).find((element) => element.hasChildNodes());
};

const isCreateLinkButton = (element: HTMLElement): boolean => {
  return findButtonByText(element, CREATE_LINK_BUTTON);
};

const isShareButton = (element: HTMLElement): boolean => {
  return findButtonByText(element, SHARE_BUTTON);
};

const isDesiredh2Element = (element: HTMLElement): boolean => {
  return Array.from(element.getElementsByTagName("h2")).some(
    (h2) =>
      h2.innerText === NEW_CHAT_HEADING ||
      h2.innerText === PUBLISHED_CHAT_HEADING
  );
};

const getCreateLinkButton = (element: HTMLElement): HTMLElement | null => {
  return element.querySelector<HTMLElement>(
    `button[data-testid='${CREATE_LINK_BUTTON_ATTRIBUTE}']`
  );
};

const getUpdateLinkButton = (element: HTMLElement): HTMLElement | undefined => {
  return Array.from(element.getElementsByTagName("button")).find(
    (el) => el.innerText === UPDATE_LINK_BUTTON
  );
};

const getPublishedURL = (dialogElement: HTMLElement): string | null => {
  const inputElement =
    dialogElement.querySelector<HTMLInputElement>("input[readonly]");
  return inputElement?.value ?? null;
};

export {
  isCreateLinkButton,
  isDesiredh2Element,
  getUpdateLinkButton,
  findActiveDialog,
  isShareButton,
  getCreateLinkButton,
  getPublishedURL,
};
