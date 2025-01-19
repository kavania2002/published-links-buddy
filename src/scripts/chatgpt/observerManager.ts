let dialogBoxObserver: MutationObserver | null = null;
let linkButtonObserver: MutationObserver | null = null;

export const resetDialogObserver = (): void => {
  if (dialogBoxObserver) {
    dialogBoxObserver.disconnect();
    dialogBoxObserver = null;
  }
};

export const resetLinkButtonObserver = (): void => {
  if (linkButtonObserver) {
    linkButtonObserver.disconnect();
    linkButtonObserver = null;
  }
};

export const setDialogBoxObserver = (
  callback: MutationCallback,
  dialogElement: HTMLElement
): void => {
  resetDialogObserver();
  dialogBoxObserver = new MutationObserver(callback);
  dialogBoxObserver.observe(dialogElement, {
    childList: true,
    subtree: true,
  });
};

export const setLinkButtonObserver = (
  callback: MutationCallback,
  createLinkButton: HTMLElement
): void => {
  resetLinkButtonObserver();
  linkButtonObserver = new MutationObserver(callback);
  linkButtonObserver.observe(createLinkButton, {
    childList: true,
    subtree: true,
  });
};
