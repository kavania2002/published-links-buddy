/**
 * Sends a URL to the background script.
 * @param url - The URL to send to the background script.
 */
export const sendUrlToBackground = async (
  url: string | null
): Promise<void> => {
  const title = await promptUserForURLTitle();
  if (url) chrome.runtime.sendMessage({ title, url });
};

/**
 * Prompts the user for a URL title.
 * @returns A promise that resolves to the URL title entered by the user.
 */
export const promptUserForURLTitle = (): Promise<string> => {
  return new Promise((resolve) => {
    const input = prompt("Enter a title for the URL:");
    resolve(input || "");
  });
};
