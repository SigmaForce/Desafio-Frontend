import { type ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const inputVariants = tv({
  base: "p-3 w-full h-11 placeholder:text-[#6F6D78] border-[#3C393F] border bg-mauve-dark-950 rounded-sm focus:border-[#8E4EC6] outline-none text-[#EEEEF0]",
});

const containerVariants = tv({
  base: "flex flex-col gap-2 justify-baseline w-full",
  variants: {
    variant: {
      full: "max-w-full",
      md: "lg:max-w-md",
      lg: "lg:max-w-lg",
      sm: "lg:max-w-sm",
    },
  },
  defaultVariants: {
    variant: "full",
  },
});

interface InputProps
  extends ComponentProps<"input">,
    VariantProps<typeof containerVariants> {
  label?: string;
}

export function Input({ label, className, variant, ...props }: InputProps) {
  return (
    <div className={containerVariants({ variant })}>
      {label && <label className="font-bold text-xs">{label}</label>}
      <input className={inputVariants({ className })} {...props} />
    </div>
  );
}
