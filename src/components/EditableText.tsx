/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

interface EditableTextProps {
  value: string;
  onChange: (val: string) => void;
  isEditing: boolean;
  className?: string;
  type?: "text" | "textarea";
  placeholder?: string;
  children?: React.ReactNode; 
}

export function EditableText({
  value,
  onChange,
  isEditing,
  className = "",
  type = "text",
  placeholder = "Edit content...",
  children,
}: EditableTextProps) {
  if (!isEditing) {
    if (children) {
      return <span className={className}>{children}</span>;
    }
    // Return standard formatted multiline or simple text
    return <span className={className}>{value}</span>;
  }

  // Edit Mode UI
  if (type === "textarea") {
    return (
      <textarea
        className={`w-full bg-navy-light text-white px-2 py-1 rounded border border-gold/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold text-inherit font-inherit ${className}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onClick={(e) => e.stopPropagation()}
        rows={4}
      />
    );
  }

  return (
    <input
      type="text"
      className={`bg-navy-light text-white px-2 py-1 rounded border border-gold/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold text-inherit font-inherit ${className}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      onClick={(e) => e.stopPropagation()}
    />
  );
}
