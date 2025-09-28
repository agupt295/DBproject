import React from 'react';
import './Textfield.css';

interface TextFieldProps {
  type?: 'text' | 'email' | 'password' | 'number';
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export const TextField: React.FC<TextFieldProps> = ({
  type = 'text',
  id,
  label,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  className = ''
}) => {
  return (
    <div className={`form-group ${className}`}>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
      />
    </div>
  );
};