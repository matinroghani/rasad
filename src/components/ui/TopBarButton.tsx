
import type { ReactNode } from "react";

type TopBarButtonProps = {
  icon: ReactNode;
  title: string;
  onClick?: () => void;
  disabled?: boolean;
};

export default function TopBarButton({
  icon,
  title,
  onClick,
  disabled = false,
}: TopBarButtonProps) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      onClick={onClick}
      disabled={disabled}
      className="relative flex shrink-0 items-center justify-center overflow-hidden rounded-[11px] border border-white/18 bg-white/8 p-2.5 text-[15px] text-[#e8f2e8] backdrop-blur-md transition-[background-color,border-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/16 hover:shadow-[0_6px_14px_rgba(0,0,0,0.1)] active:translate-y-0 active:scale-[0.96] disabled:pointer-events-none disabled:opacity-50"
    >
      {icon}
    </button>
  );
}
