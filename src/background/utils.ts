import { LINK_ADDED_MESSAGE } from "../constants/extension";
import { addLink } from "../db/services";
import { Message } from "../types";

/**
 * Listen for messages from the content script and add the link to the database.
 * @returns A promise that resolves when the message listener is added.
 */
const listenMessage = async () => {
  chrome.runtime.onMessage.addListener(async (message: Message) => {
    if (message.data) {
      const currentDate = new Date();
      try {
        await addLink({
          id: currentDate.getTime().toString(),
          title: message.data.title,
          url: message.data.url,
          type: message.data.platform,
          createdAt: currentDate.toISOString(),
        });
        // TODO: Might raise error when the side panel is not opened
        chrome.runtime.sendMessage({ message: LINK_ADDED_MESSAGE });
      } catch (error) {
        console.error(error);
      }
    }
  });
};

export { listenMessage };
