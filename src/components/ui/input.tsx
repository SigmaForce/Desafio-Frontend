import { type ComponentProps } from "react";
import { tv } from "tailwind-variants";

interface InputProps extends ComponentProps<"input"> {
  label: string;
}

const inputVariants = tv({
  base: "p-3 w-full placeholder:text-[#6F6D78] border-[#3C393F] border bg-mauve-dark-950 rounded-sm focus:border-[#8E4EC6] outline-none text-[#EEEEF0]",
});

export function Input({ label, className, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2 justify-baseline">
      {label && <label className="font-bold text-xs">{label}</label>}
      <input className={inputVariants()} {...props} />
    </div>
  );
}
