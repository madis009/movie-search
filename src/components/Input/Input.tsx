import React from "react";
import "./Input.scss";

interface InputProps {
    type: 'select' | 'checkbox' | 'text';
    name: string;
    value: string | number | boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    options?: { label: string; value: string | number }[];
    placeholder?: string;
    label?: string;  // Optional label for enhanced UI clarity
}

const Input: React.FC<InputProps> = ({ type, name, value, onChange, options, placeholder, label }) => {
    return (
        <div className={`input-container ${type}-input`}>
            {label && <label htmlFor={name}>{label}</label>}
            {type === 'select' ? (
                <select id={name} name={name} value={String(value)} onChange={onChange} className="select-field">
                    {options?.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            ) : type === 'checkbox' ? (
                <div className="checkbox-wrapper">
                    <input
                        id={name}
                        type="checkbox"
                        name={name}
                        checked={Boolean(value)}
                        onChange={onChange}
                        className="checkbox-input"
                    />
                    <span className="checkbox-label">{label}</span>
                </div>
            ) : (
                <input
                    id={name}
                    type="text"
                    name={name}
                    value={String(value)}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="text-input"
                />
            )}
        </div>
    );
};

export default Input;
