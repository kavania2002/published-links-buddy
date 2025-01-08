import { useState, useEffect } from "react";
import { Link, LinkType } from "../types";
import { addLink as dbAddLink, getLinks as dbGetLinks } from "../db/services";

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

  const updateLink = (linkData: Partial<Link>) => {
    if (editingLink) {
      setLinks(
        links.map((link) =>
          link.id === editingLink.id
            ? { ...editingLink, ...linkData, updatedAt: new Date().toISOString() }
            : link
        )
      );
      setEditingLink(null);
    }
  };

  const deleteLink = (id: string) => {
    if (window.confirm("Are you sure you want to delete this link?")) {
      setLinks(links.filter((link) => link.id !== id));
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