import { LinkType } from "./Link";

export interface Message {
  message?: string;
  data?: {
    title: string;
    url: string;
    platform: LinkType;
  };
}
