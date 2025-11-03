import { type ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const inputVariants = tv({
  base: "p-3 w-full h-11 placeholder:text-[#6F6D78] border-[#3C393F] border bg-mauve-dark-950 rounded-sm focus:border-[#8E4EC6] outline-none text-[#EEEEF0]",
  variants: {
    hasIcon: {
      true: "pr-10",
    },
  },
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
  icon?: React.ReactNode;
}

export function Input({
  label,
  className,
  variant,
  icon,
  ...props
}: InputProps) {
  return (
    <div className={containerVariants({ variant })}>
      {label && <label className="font-bold text-xs">{label}</label>}
      <div className="relative w-full">
        <input
          className={inputVariants({ className, hasIcon: !!icon })}
          {...props}
        />
        {icon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6F6D78] pointer-events-none">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
