import { useState, useEffect, useCallback } from "react";
import { Link, LinkType } from "../types";
import {
  addLink as dbAddLink,
  getLinks as dbGetLinks,
  updateLink as dbUpdateLink,
  deleteLink as dbDeleteLink,
} from "../db/services";
import { listenMessage } from "../utils/extension";
import { LINK_ADDED_MESSAGE } from "../constants/extension";

export default function useLinks() {
  const [links, setLinks] = useState<Link[]>([]);
  const [editingLink, setEditingLink] = useState<Link | null>(null);

  useEffect(() => {
    dbGetLinks().then(setLinks);
  }, []);

  const addLink = async (linkData: Partial<Link>) => {
    const newLink: Link = {
      id: Date.now().toString(),
      title: linkData.title || "",
      url: linkData.url || "",
      type: (linkData.type as LinkType) || "gpt",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await dbAddLink(newLink);
    dbGetLinks().then(setLinks);
  };

  const updateLink = async (linkData: Partial<Link>) => {
    if (editingLink) {
      await dbUpdateLink({
        ...(linkData as Link),
        updatedAt: new Date().toISOString(),
      });
      dbGetLinks().then(setLinks);
      setEditingLink(null);
    }
  };

  const deleteLink = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this link?")) {
      await dbDeleteLink(id);
      dbGetLinks().then(setLinks);
    }
  };

  const refreshLinks = async () => {
    await dbGetLinks().then(setLinks);
  };

  const listenLinkUpdates = useCallback(() => {
    listenMessage(refreshLinks, (message) => message === LINK_ADDED_MESSAGE);
  }, []);

  return {
    links,
    editingLink,
    setEditingLink,
    addLink,
    updateLink,
    deleteLink,
    listenLinkUpdates,
  };
}
