import { Link } from "../types";
import LinkItem from "./LinkItem";

interface LinkListProps {
  links: Link[];
  onEdit: (link: Link) => void;
  onDelete: (id: string) => void;
}

const LinkList = ({ links, onEdit, onDelete }: LinkListProps) => {
  return links.length === 0 ? (
    <div className="text-center py-8 text-gray-500"></div>
  ) : (
    <div className="divide-y divide-gray-100">
      {links.map((link) => (
        <LinkItem
          key={link.id}
          link={link}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default LinkList;
