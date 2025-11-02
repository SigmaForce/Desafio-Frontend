import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const iconButton = tv({
  base: "flex w-fit text-nowrap cursor-pointer items-center px-5 py-3 rounded-xs h-11 justify-center transition-colors duration-150",
  variants: {
    variant: {
      primary:
        "bg-[#8E4EC6]  hover:bg-[#9A5CD0] active:bg-[#8457AA] disabled:bg-[#6F6D78] disabled:cursor-auto",
      secondary:
        "bg-[#B744F7]/8 hover:bg-[#C150FF]/18 active:bg-[#B412F9]/4 disabled:bg-[#EBEAF8]/8 disabled:cursor-auto",
    },
    defaultVariants: {
      variant: "primary",
    },
  },
});

interface IconButtonProps
  extends ComponentProps<"button">,
    VariantProps<typeof iconButton> {}

export function Button({ className, variant, ...props }: IconButtonProps) {
  return (
    <button
      className={iconButton({ variant, className })}
      type="button"
      {...props}
    />
  );
}
