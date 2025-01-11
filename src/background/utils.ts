import { addLink } from "../db/services";
import { Message } from "../types";

/**
 * Listen for messages from the content script and add the link to the database.
 * @returns A promise that resolves when the message listener is added.
 */
const listenMessage = async () => {
  chrome.runtime.onMessage.addListener(async (message: Message) => {
    const currentDate = new Date();
    await addLink({
      id: currentDate.getTime().toString(),
      title: message.title,
      url: message.url,
      type: "claude",
      createdAt: currentDate.toISOString(),
    });
  });
};

export { listenMessage };
