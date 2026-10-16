
import type { Cow } from "@/types/herd/herd";
import { herdTableConfig } from "@/data/constants/herdPage/herdTable.config";
import { Image as ImageIcon } from "lucide-react";

interface CowAvatarProps {
  cow: Cow;
}

export default function CowAvatar({ cow }: CowAvatarProps) {
  return (
    <div className="aspect-square w-full max-w-11 shrink-0 overflow-hidden rounded-[var(--radius-md)]">
      {cow.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={cow.imageUrl}
          alt={`تصویر ${cow.name}`}
          loading="lazy"
          decoding="async"
          className="size-full object-cover"
        />
      ) : (
        <div
          className="grid size-full place-items-center border border-dashed border-[var(--border-hover)] bg-[var(--bg-secondary)] text-[var(--text-light)]"
          aria-label={herdTableConfig.emptyImageLabel}
        >
          <ImageIcon className="size-[1.15em]" strokeWidth={1.6} />
        </div>
      )}
    </div>
  );
}
