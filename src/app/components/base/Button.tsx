import clsx from "clsx";
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  HTMLAttributes,
  PropsWithChildren,
  forwardRef,
} from "react";

type ButtonProps = {
  variant?: "solid" | "outline";
  iconAlign?: "left" | "right";
  icon?: <T>(props: HTMLAttributes<T> | any) => React.ReactNode;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button: React.ForwardRefExoticComponent<PropsWithChildren<ButtonProps>> = forwardRef(
  function Button({
    variant = "solid",
    iconAlign = "left",
    icon,
    children,
    ...nativeButtonProps
  }: ButtonProps,ref)  {
    const buttonBaseClass = clsx(
      "py-2 px-3 inline-flex items-center gap-x-1 text-sm font-medium rounded-lg border disabled:opacity-50 disabled:pointer-events-none",
      variant === "solid" &&
        "border-transparent bg-purple-600 text-white hover:bg-purple-700",
      variant === "outline" &&
        "border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50"
    );

    return (
      <button ref={ref} className={buttonBaseClass} {...nativeButtonProps}>
        {iconAlign === "left" && icon?.({ className: "flex-shrink-0 size-4" })}
        {children}
        {iconAlign === "right" && icon?.({ className: "flex-shrink-0 size-4" })}
      </button>
    );
  }
);

export default Button;
