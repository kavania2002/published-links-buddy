import { useMemo, useState } from "react";
import { Link, LinkType } from "../types";

interface FilterManagerProps {
  links: Link[];
}

export default function useFilterManager({ links }: FilterManagerProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<LinkType | "all">(
    "all"
  );
  const handlePlatformChange = (platform: LinkType | "all") => {
    setSelectedPlatform(platform);
  };

  const platformCounts = useMemo(() => {
    const counts = links.reduce((acc, link) => {
      return { ...acc, [link.type]: (acc[link.type] || 0) + 1 };
    }, {} as Record<LinkType | "all", number>);

    counts.all = links.length;
    return counts;
  }, [links]);

  const filteredLinks = useMemo(() => {
    return selectedPlatform === "all"
      ? links
      : links.filter((link) => link.type === selectedPlatform);
  }, [links, selectedPlatform]);

  return {
    selectedPlatform,
    handlePlatformChange,
    platformCounts,
    filteredLinks,
  };
}
