"use client";

function ProfileInput({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  disabled = false,
}) {
  return (
    <div className="mt-4">
      <label className="block text-sm font-medium">{label}</label>
      <div className="relative mt-1">
        <input
          type={type}
          className={`w-full border rounded-lg px-4 py-3 ${
            disabled ? "dark:text-gray-300 text-gray-500" : "text-gray-800"
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={disabled}
        />
        {value && !disabled && (
          <button
            className="absolute right-3 top-3 text-gray-500"
            onClick={() => onChange({ target: { value: "" } })}
          >
            &#x2715;
          </button>
        )}
      </div>
    </div>
  );
}

export default ProfileInput;
