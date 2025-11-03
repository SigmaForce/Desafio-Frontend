import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "../../lib/utils";

const ButtonVariants = tv({
  base: "flex w-fit text-nowrap cursor-pointer items-center rounded-xs h-11 justify-center transition-colors duration-150",
  variants: {
    variant: {
      primary:
        "bg-[#8E4EC6]  hover:bg-[#9A5CD0] active:bg-[#8457AA] disabled:bg-[#6F6D78] disabled:cursor-auto",
      secondary:
        "bg-[#B744F7]/8 hover:bg-[#C150FF]/18 active:bg-[#B412F9]/4 disabled:bg-[#EBEAF8]/8 disabled:cursor-auto",
      outline: "border bg-[#EBEAF8]/8  hover:[#8E4EC6] ",
    },
    size: {
      icon: "px-5 py-3 w-fit h-auto",
      lg: "px-5 py-3 h-11",
      xl: "px-8 py-3 h-11",
    },
    defaultVariants: {
      size: "lg",
      variant: "primary",
    },
  },
});

interface IconButtonProps
  extends ComponentProps<"button">,
    VariantProps<typeof ButtonVariants> {}

export function Button({
  className,
  size,
  variant,
  ...props
}: IconButtonProps) {
  return (
    <button
      className={cn(ButtonVariants({ variant, size, className }))}
      type="button"
      {...props}
    />
  );
}
