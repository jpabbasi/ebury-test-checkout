import React, { useEffect, useState } from 'react';
import { AiOutlineDown } from 'react-icons/ai';
import { BsInfoCircleFill } from 'react-icons/bs';
import '../styles/InputField.css';

interface InputProps {
  name: string;
  label: string;
  value: string | number;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  type?: string;
  maxLength?: number;
  options?: { value: string | number; label: string }[];
  info?: string;
  disabled?: boolean;
  error?: string;
}

const InputField: React.FC<InputProps> = ({
  name,
  label,
  value,
  onChange,
  disabled,
  type = 'text',
  maxLength,
  options,
  info,
  error,
}) => {
  const [infoOpen, setInfoOpen] = useState(false);

  useEffect(() => {
    if (infoOpen) {
      const timeout = setTimeout(() => setInfoOpen(false), 8000);
      return () => clearTimeout(timeout);
    }
  }, [infoOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest('.info-wrapper')) {
        setInfoOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const renderSelect = () => (
    <div className="select-wrapper">
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
      >
        <option value="" disabled></option>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <AiOutlineDown className="select-icon" />
    </div>
  );

  const renderInput = () => (
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      placeholder=" "
      disabled={disabled}
      required
      aria-invalid={!!error}
      aria-describedby={error ? `${name}-error` : undefined}
    />
  );

  return (
    <div
      className={`input-field ${error ? 'invalid' : value ? 'filled' : ''} ${
        disabled ? 'confirmed' : ''
      }`}
    >
      {options ? renderSelect() : renderInput()}

      <label htmlFor={name} className={value !== '' ? 'active' : ''}>
        {label}
      </label>

      {info && (
        <div className="info-wrapper">
          <BsInfoCircleFill
            onClick={() => setInfoOpen(!infoOpen)}
            className="info-icon"
            aria-label="More info"
            aria-expanded={infoOpen}
          />
          {infoOpen && <div className="info-tooltip">{info}</div>}
        </div>
      )}

      {error && (
        <p id={`${name}-error`} className="error-message">
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;
