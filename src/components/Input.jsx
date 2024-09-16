import React from "react";

export default function Input({ label, id, error, name, value, onChange }) {
  return (
    <div className="input-container">
      <label htmlFor={id}>{label}</label>
      <input name={name} id={id} value={value} onChange={onChange} />
      <p className="errors">{error}</p>
    </div>
  );
}
