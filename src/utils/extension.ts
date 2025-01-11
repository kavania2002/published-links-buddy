import { Message } from "../types";

const listenMessage = async (
  callback: () => void,
  condition: (value: string) => boolean
) => {
  chrome.runtime.onMessage.addListener(async (message: Message) => {
    if (message.message && condition(message.message)) {
      callback();
    }
  });
};

export { listenMessage };
