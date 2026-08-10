"use client";

import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";

const fieldClass =
  "w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none";

interface InputGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  error?: string;
}

export function InputGroup({ label, hint, error, id, className, ...props }: InputGroupProps) {
  const inputId = id ?? props.name;
  return (
    <div>
      <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <input id={inputId} className={className ? `${fieldClass} ${className}` : fieldClass} {...props} />
      {hint && !error ? <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{hint}</p> : null}
      {error ? (
        <p className="mt-1 text-xs text-red-500" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

interface SelectGroupProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  children: ReactNode;
  hint?: string;
}

export function SelectGroup({ label, hint, id, children, className, ...props }: SelectGroupProps) {
  const selectId = id ?? props.name;
  return (
    <div>
      <label htmlFor={selectId} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <select id={selectId} className={className ? `${fieldClass} ${className}` : fieldClass} {...props}>
        {children}
      </select>
      {hint ? <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{hint}</p> : null}
    </div>
  );
}

export default InputGroup;
