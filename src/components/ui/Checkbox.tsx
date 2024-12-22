interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function Checkbox({ checked, onChange }: CheckboxProps) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only peer"
      />
      <div className="toggle-switch"></div>
    </label>
  );
}
