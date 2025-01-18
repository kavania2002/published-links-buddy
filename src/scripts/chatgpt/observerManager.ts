let dialogBoxObserver: MutationObserver | null = null;
let createLinkButtonObserver: MutationObserver | null = null;

export const resetDialogObserver = (): void => {
  if (dialogBoxObserver) {
    dialogBoxObserver.disconnect();
    dialogBoxObserver = null;
  }
};

export const resetCreateLinkButtonObserver = (): void => {
  if (createLinkButtonObserver) {
    createLinkButtonObserver.disconnect();
    createLinkButtonObserver = null;
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

export const setCreateLinkButtonObserver = (
  callback: MutationCallback,
  createLinkButton: HTMLElement
): void => {
  resetCreateLinkButtonObserver();
  createLinkButtonObserver = new MutationObserver(callback);
  createLinkButtonObserver.observe(createLinkButton, {
    childList: true,
    subtree: true,
  });
};
