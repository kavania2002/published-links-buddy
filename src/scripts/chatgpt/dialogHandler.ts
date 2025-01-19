import { GPT } from "../common/constants";
import { sendUrlToBackground } from "../common/utils";
import { COPIED } from "./constants";
import {
  resetLinkButtonObserver,
  resetDialogObserver,
  setLinkButtonObserver,
  setDialogBoxObserver,
} from "./observerManager";
import {
  getCreateLinkButton,
  findActiveDialog,
  getPublishedURL,
  isShareButton,
  isDesiredh2Element,
  getUpdateLinkButton,
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
      resetLinkButtonObserver();
    }
  }
};

const extractURLFromDialog = (
  mutationList: MutationRecord[],
  dialogElement: HTMLElement
): void => {
  const isDesiredh2Mutation = mutationList.find((mutation) =>
    isDesiredh2Element(mutation.target as HTMLElement)
  );

  if (!isDesiredh2Mutation) {
    console.log("No desired h2 element found");
    resetDialogObserver();
    return;
  }

  const linkButton =
    getCreateLinkButton(dialogElement) || getUpdateLinkButton(dialogElement);
  if (linkButton) {
    linkButton.addEventListener("click", () => {
      setLinkButtonObserver(
        (mutationRecords) =>
          observeCreateLinkButton(mutationRecords, dialogElement),
        linkButton
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
          extractURLFromDialog(mutationRecords, dialogElement),
        dialogElement
      );
    }
  }, 500);
};

export { handleDialogClick };
