import { type ReactNode } from "react";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-surface border border-stroke rounded-2xl p-6 ${className}`}>
      {children}
    </div>
  );
}

export function Label({ children }: { children: ReactNode }) {
  return (
    <label className="block text-xs text-muted uppercase tracking-[0.2em] mb-1.5">
      {children}
    </label>
  );
}

export function Input({
  value,
  onChange,
  placeholder,
  type = "text",
  className = "",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  className?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full bg-bg border border-stroke rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-muted/50 focus:outline-none focus:border-[#89AACC] transition-colors ${className}`}
    />
  );
}

export function Textarea({
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full bg-bg border border-stroke rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-muted/50 focus:outline-none focus:border-[#89AACC] transition-colors resize-none"
    />
  );
}

export function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-bg border border-stroke rounded-xl px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-[#89AACC] transition-colors appearance-none cursor-pointer"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value} className="bg-surface">
          {o.label}
        </option>
      ))}
    </select>
  );
}

export function Btn({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md";
  className?: string;
  type?: "button" | "submit";
}) {
  const base = "inline-flex items-center gap-2 rounded-xl font-medium transition-all duration-200 cursor-pointer";
  const sizes = { sm: "text-xs px-3 py-1.5", md: "text-sm px-4 py-2" };
  const variants = {
    primary: "bg-text-primary text-bg hover:opacity-90",
    secondary: "bg-stroke/60 text-text-primary hover:bg-stroke",
    danger: "bg-red-900/40 text-red-400 border border-red-900/60 hover:bg-red-900/60",
    ghost: "text-muted hover:text-text-primary hover:bg-stroke/40",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-text-primary">{title}</h2>
      {subtitle && <p className="text-sm text-muted mt-1">{subtitle}</p>}
    </div>
  );
}

export function Divider() {
  return <div className="h-px bg-stroke my-6" />;
}

export function ImagePreview({ src }: { src: string }) {
  if (!src) return null;
  return (
    <img
      src={src}
      alt="preview"
      className="mt-2 w-full h-32 object-cover rounded-xl border border-stroke"
      onError={(e) => (e.currentTarget.style.display = "none")}
    />
  );
}

export function Badge({ children, color = "default" }: { children: ReactNode; color?: "default" | "blue" | "green" }) {
  const colors = {
    default: "bg-stroke/60 text-muted",
    blue: "bg-[#89AACC]/20 text-[#89AACC]",
    green: "bg-green-900/30 text-green-400",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${colors[color]}`}>
      {children}
    </span>
  );
}
