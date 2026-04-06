import { type InputHTMLAttributes } from "react";

type FormFieldProps = InputHTMLAttributes<
  HTMLInputElement | HTMLTextAreaElement
> & {
  label: string;
  error?: string;
  as?: "input" | "textarea";
};

export function FormField({
  label,
  error,
  as = "input",
  id,
  ...props
}: FormFieldProps): React.ReactElement {
  const fieldId = id ?? label.toLowerCase().replace(/\s+/g, "-");
  const baseStyles =
    "w-full rounded-button border border-brand-taupe bg-white px-4 py-3 text-sm text-brand-black placeholder:text-brand-black/40 focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue min-h-[44px]";

  return (
    <div>
      <label
        htmlFor={fieldId}
        className="mb-1 block text-sm font-medium text-brand-black"
      >
        {label}
      </label>
      {as === "textarea" ? (
        <textarea
          id={fieldId}
          className={`${baseStyles} min-h-[120px]`}
          {...(props as InputHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={fieldId}
          className={baseStyles}
          {...(props as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      {error && <p className="mt-1 text-xs text-brand-red">{error}</p>}
    </div>
  );
}
