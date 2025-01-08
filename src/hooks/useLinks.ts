import { useState, useEffect } from "react";
import { Link, LinkType } from "../types";
import { addLink as dbAddLink, getLinks as dbGetLinks, updateLink as dbUpdateLink, deleteLink as dbDeleteLink } from "../db/services";

export function useLinks() {
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
    };
    await dbAddLink(newLink);
    dbGetLinks().then(setLinks);
  };

  const updateLink = async (linkData: Partial<Link>) => {
    if (editingLink) {
      await dbUpdateLink(linkData as Link);
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

  return {
    links,
    editingLink,
    setEditingLink,
    addLink,
    updateLink,
    deleteLink,
  };
} 