import { Link, Message } from "../types";

export const listenMessage = async (
  addLink: (linkData: Partial<Link>) => Promise<void>
) => {
  chrome.runtime.onMessage.addListener(async (message: Message) => {
    await addLink({
      title: message.title,
      url: message.url,
      type: "claude",
      createdAt: new Date().toISOString(),
    });
  });
};
