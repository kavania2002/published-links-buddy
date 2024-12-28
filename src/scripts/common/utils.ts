/**
 * Sends a URL to the background script.
 * @param url - The URL to send to the background script.
 */
export const sendUrlToBackground = (url: string | null): void => {
  if (url) chrome.runtime.sendMessage({ url });
};
