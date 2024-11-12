interface InputFieldProps {
  label: string;
  name: string;
  type?: string; // Tipo del input (text, email, tel, date, etc.)
  value: string | number | undefined;
  onChange?: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  required?: boolean;
  options?: { value: string; label: string }[]; // Opciones para select
  customClasses?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  readOnly?: boolean;
  disabled?: boolean;
  "data-idioma"?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  required,
  options,
  customClasses,
  placeholder,
  icon,
  readOnly = false,
  disabled = false,
  "data-idioma": idioma,
}) => {
  return (
    <div className={`relative ${customClasses}`}>
      <label className="block text-sm font-[600]" htmlFor={name}>
        {label}
      </label>
      {type === "select" ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={`mt-1 w-full block border border-soft-gray rounded-md shadow-sm outline-none text-sm px-2 py-1.5`}
          required={required}
        >
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`mt-1 w-full block border border-soft-gray rounded-md shadow-sm outline-none text-sm px-2 py-1.5`}
          placeholder={placeholder}
          readOnly={readOnly}
          disabled={disabled}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`mt-1 w-full block border border-soft-gray rounded-md shadow-sm outline-none text-sm px-2 py-1.5 pr-10`} // Añadido padding a la derecha para el icono
          placeholder={placeholder}
          readOnly={readOnly}
          disabled={disabled}
          data-idioma={idioma}
        />
      )}
      {/* Renderizar el icono si se proporciona */}
      {icon && (
        <div className="absolute flex right-2 top-[70%] transform -translate-y-[50%] cursor-pointer">
          {icon}
        </div>
      )}
    </div>
  );
};

export default InputField;
