import React from "react";

export default function SelectOptionInput({
  label,
  error,
  name,
  value,
  onChange,
  categoryOption,
}) {
  return (
    <div className="input-container">
      <label htmlFor={name}>{label}</label>
      <select name={name} value={value} onChange={onChange}>
        {categoryOption.map((o) => (
          <option key={o.value} value={o.value} hidden={o.value === ""}>
            {o.title}
          </option>
        ))}
      </select>
      <p className="errors">{error}</p>
    </div>
  );
}
