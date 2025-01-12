import { useState } from "react";
import { Link } from "../types";

interface FormManagerProps {
  editingLink: Link | null;
  addLink: (linkData: Partial<Link>) => void;
  updateLink: (linkData: Partial<Link>) => void;
}

export default function useFormManager({
  editingLink,
  addLink,
  updateLink,
}: FormManagerProps) {
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = (linkData: Partial<Link>) => {
    if (editingLink) {
      updateLink(linkData);
    } else {
      addLink(linkData);
      setIsAdding(false);
    }
  };

  return {
    isAdding,
    setIsAdding,
    handleSubmit,
  };
}
