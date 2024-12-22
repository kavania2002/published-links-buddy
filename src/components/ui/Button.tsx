interface ButtonProps {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  buttonType?: "submit" | "reset" | "button";
}

export default function Button({
  children,
  onClick,
  className = "",
  buttonType = "button",
}: ButtonProps) {
  return (
    <button
      type={buttonType}
      onClick={onClick}
      className={`w-full bg-gray-900 text-white px-4 py-2.5 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 font-medium shadow-sm hover:shadow ${className}`}>
      {children}
    </button>
  );
}
