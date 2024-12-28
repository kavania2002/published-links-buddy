import { useState } from "react";
import { Link, LinkType } from "../types";

export function useLinks(initialLinks: Link[] = []) {
  const [links, setLinks] = useState<Link[]>(initialLinks);
  const [editingLink, setEditingLink] = useState<Link | null>(null);

  const addLink = (linkData: Partial<Link>) => {
    const newLink: Link = {
      id: Date.now().toString(),
      title: linkData.title || "",
      url: linkData.url || "",
      type: (linkData.type as LinkType) || "gpt",
      createdAt: new Date().toISOString(),
    };
    setLinks([newLink, ...links]);
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