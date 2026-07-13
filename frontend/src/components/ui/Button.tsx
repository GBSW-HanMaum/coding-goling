import * as React from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * 듀오링고 시그니처 3D 버튼.
 * 아래쪽 두꺼운 테두리(border-b-4)로 입체감을 주고, 누르면(active) 그 테두리가
 * 사라지며(border-b-0) 버튼이 눌리는 느낌을 낸다.
 */
export const buttonVariants = cva(
  "inline-flex select-none items-center justify-center whitespace-nowrap rounded-2xl text-sm font-extrabold uppercase tracking-wide transition-all focus:outline-none disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        default:
          "border-2 border-b-4 border-swan bg-white text-wolf hover:bg-polar active:border-b-2",
        primary:
          "border-b-4 border-macaw-shadow bg-macaw text-white hover:brightness-105 active:border-b-0",
        primaryOutline:
          "border-2 border-b-4 border-swan bg-white text-macaw hover:bg-polar active:border-b-2",
        secondary:
          "border-b-4 border-coral-shadow bg-coral text-white hover:brightness-105 active:border-b-0",
        secondaryOutline:
          "border-2 border-b-4 border-swan bg-white text-coral hover:bg-polar active:border-b-2",
        danger:
          "border-b-4 border-cardinal-shadow bg-cardinal text-white hover:brightness-105 active:border-b-0",
        dangerOutline:
          "border-2 border-b-4 border-swan bg-white text-cardinal hover:bg-polar active:border-b-2",
        super:
          "border-b-4 border-beetle-shadow bg-beetle text-white hover:brightness-105 active:border-b-0",
        gold: "border-b-4 border-bee-shadow bg-bee text-white hover:brightness-105 active:border-b-0",
        locked:
          "cursor-not-allowed border-b-4 border-[#c9c9c9] bg-swan text-hare",
        ghost:
          "border-2 border-transparent bg-transparent text-wolf hover:bg-polar",
        sidebar:
          "border-2 border-transparent bg-transparent text-wolf hover:bg-polar",
        sidebarActive:
          "border-2 border-macaw-border bg-macaw-light text-macaw",
      },
      size: {
        default: "h-11 px-4 py-2",
        sm: "h-9 px-3 text-xs",
        lg: "h-[52px] px-6 text-base",
        icon: "h-10 w-10",
        rounded: "rounded-full",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
);
Button.displayName = "Button";
