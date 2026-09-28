import React, { forwardRef, useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import "./glow-button.css";

interface ComponentProps {
  label?: string;
  onClick?(): void;
  className?: string;
  disabled?: boolean;
}

export const Component = forwardRef<HTMLButtonElement, ComponentProps>(
  ({ label = "Generate", onClick, className, disabled = false }, ref) => {
    const [isClicked, setIsClicked] = useState(false);
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => () => {
      if (timer.current !== null) clearTimeout(timer.current);
    }, []);

    const handleClick = () => {
      if (disabled) return;
      if (timer.current !== null) clearTimeout(timer.current);
      setIsClicked(true);
      timer.current = setTimeout(() => {
        setIsClicked(false);
        timer.current = null;
      }, 200);
      onClick?.();
    };

    return (
      <button
        ref={ref}
        type="button"
        aria-label={label}
        disabled={disabled}
        className={cn("glow-btn", className)}
        onClick={handleClick}
        data-state={isClicked ? "clicked" : undefined}
      >
        <span className="flex items-center justify-center gap-1.5">
          {label}
          <Sparkles size={16} className="ml-0.5" aria-hidden="true" focusable="false" />
        </span>
      </button>
    );
  },
);

Component.displayName = "Component";
