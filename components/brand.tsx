import { Layers } from "lucide-react";
import { AnimatedShinyText } from "./magicui/animated-shiny-text";
import { cn } from "@/lib/utils";

type BrandProps = {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const textSizeMap = {
  sm: "text-xl",
  md: "text-3xl",
  lg: "text-6xl",
  xl: "text-8xl"
};

const iconSizeMap = {
  sm: "size-6",
  md: "size-8",
  lg: "size-14",
  xl: "size-24"
};

export default function Brand({ className, size = "md" }: BrandProps) {
  const textSize = textSizeMap[size];
  const iconSize = iconSizeMap[size];

  return (
    <AnimatedShinyText className={cn(
      "mx-0 flex items-center font-semibold font-heading tracking-tight gap-2",
      textSize,
      className
    )}>
      <Layers className={iconSize} />
      Stashly
    </AnimatedShinyText>
  )
}