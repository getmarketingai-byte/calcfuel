"use client";

import { useId } from "react";
import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";

const fieldClass =
  "w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-400 outline-none";

interface InputGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  error?: string;
}

export function InputGroup({ label, hint, error, id, className, ...props }: InputGroupProps) {
  // Call sites rarely pass an id or a name. Without a generated fallback the label
  // renders with htmlFor={undefined} and the control has no accessible name at all.
  const generatedId = useId();
  const inputId = id ?? props.name ?? generatedId;
  const hintId = hint && !error ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = errorId ?? hintId;
  return (
    <div>
      <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <input
        id={inputId}
        aria-describedby={describedBy}
        aria-invalid={error ? true : undefined}
        className={className ? `${fieldClass} ${className}` : fieldClass}
        {...props}
      />
      {hintId ? (
        <p id={hintId} className="mt-1 text-xs text-gray-600 dark:text-gray-300">
          {hint}
        </p>
      ) : null}
      {errorId ? (
        <p id={errorId} className="mt-1 text-xs text-red-700 dark:text-red-400" role="alert">
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
  const generatedId = useId();
  const selectId = id ?? props.name ?? generatedId;
  const hintId = hint ? `${selectId}-hint` : undefined;
  return (
    <div>
      <label htmlFor={selectId} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <select
        id={selectId}
        aria-describedby={hintId}
        className={className ? `${fieldClass} ${className}` : fieldClass}
        {...props}
      >
        {children}
      </select>
      {hintId ? (
        <p id={hintId} className="mt-1 text-xs text-gray-600 dark:text-gray-300">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export default InputGroup;
