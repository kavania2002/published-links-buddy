import { useState, useMemo, useCallback } from "react";
import { Link } from "../types";

interface SearchManagerProps {
  filteredLinks: Link[];
}

const useSearchManager = ({
  filteredLinks,
}: SearchManagerProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = useCallback((value: string, resetPage: () => void) => {
    setSearchQuery(value);
    resetPage();
  }, []);

  const searchedLinks = useMemo(() => {
    return filteredLinks.filter((link) =>
      link.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [filteredLinks, searchQuery]);

  return {
    searchQuery,
    handleSearch,
    searchedLinks,
  };
};

export default useSearchManager;
