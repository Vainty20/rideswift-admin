export default function Input({
  id,
  name,
  value,
  type,
  maxLength,
  onChange,
  onBlur,
  placeholder,
  icon,
}) {
  return (
    <div className="input input-lg input-bordered w-full flex items-center">
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        maxLength={maxLength}
        className="flex-1 border-0 fs-5 outline-0"
        placeholder={placeholder}
        required
      />
      {icon}
    </div>
  );
}
