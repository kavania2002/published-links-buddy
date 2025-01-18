/**
 * Sends a URL to the background script.
 * @param url - The URL to send to the background script.
 */
export const sendUrlToBackground = async (
  url: string | null,
  platform: string
): Promise<void> => {
  try {
    const title = await promptUserForURLTitle();
    if (url) chrome.runtime.sendMessage({ data: { title, url, platform } });
  } catch (error) {
    console.error(error);
  }
};

/**
 * Prompts the user for a URL title.
 * @returns A promise that resolves to the URL title entered by the user.
 */
export const promptUserForURLTitle = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    const input = prompt("Enter a title for the URL:");
    if (input === null) return reject("User cancelled the prompt.");
    resolve(input || "");
  });
};
