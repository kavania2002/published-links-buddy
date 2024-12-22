export type LinkType = "gpt" | "claude" | "bolt" | "rollout";

export interface Link {
  id: string;
  title: string;
  url: string;
  type: LinkType;
  createdAt: string;
}

export interface BotDetails {
  id: LinkType;
  name: string;
  image: string;
}
