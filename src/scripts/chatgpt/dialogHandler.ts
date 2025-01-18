import { GPT } from "../common/constants";
import { sendUrlToBackground } from "../common/utils";
import { COPIED } from "./constants";
import {
  resetCreateLinkButtonObserver,
  resetDialogObserver,
  setCreateLinkButtonObserver,
  setDialogBoxObserver,
} from "./observerManager";
import {
  getCreateLinkButton,
  findActiveDialog,
  getPublishedURL,
  isNewChat,
  isShareButton,
} from "./utils";

const observeCreateLinkButton = (
  mutationList: MutationRecord[],
  dialogElement: HTMLElement
): void => {
  const copiedMutation = mutationList.find(
    (mutation) => (mutation.target as HTMLElement).innerText === COPIED
  );
  if (copiedMutation) {
    try {
      const publishedURL = getPublishedURL(dialogElement);
      console.log(publishedURL);
      sendUrlToBackground(publishedURL, GPT);
    } catch (error) {
      console.error("Failed to get published URL:", error);
    } finally {
      resetCreateLinkButtonObserver();
    }
  }
};

const checkUnpublishedChat = (
  mutationList: MutationRecord[],
  dialogElement: HTMLElement
): void => {
  const newChatMutation = mutationList.find((mutation) =>
    isNewChat(mutation.target as HTMLElement)
  );

  // TODO: what if the published chat is not saved previously and the user wants to save it now?
  if (!newChatMutation) {
    console.log("No new chat detected");
    resetDialogObserver();
    return;
  }

  const createLinkButton = getCreateLinkButton(dialogElement);
  if (createLinkButton) {
    createLinkButton.addEventListener("click", () => {
      setCreateLinkButtonObserver(
        (mutationRecords) =>
          observeCreateLinkButton(mutationRecords, dialogElement),
        createLinkButton
      );
    });
  }

  resetDialogObserver();
};

const handleDialogClick = (event: MouseEvent): void => {
  const clickedElement = event.target as HTMLElement;

  if (!isShareButton(clickedElement)) {
    return;
  }

  setTimeout(() => {
    const dialogElement = findActiveDialog();
    if (dialogElement) {
      setDialogBoxObserver(
        (mutationRecords: MutationRecord[]) =>
          checkUnpublishedChat(mutationRecords, dialogElement),
        dialogElement
      );
    }
  }, 500);
};

export { handleDialogClick };
