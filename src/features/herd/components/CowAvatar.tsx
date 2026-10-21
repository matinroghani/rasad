import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";
import { Cow } from "../types";
import { herdTableConfig } from "../config/herdTable.config";

interface CowAvatarProps {
  cow: Cow;
}

export default function CowAvatar({ cow }: CowAvatarProps) {
  return (
    <div className="relative aspect-square w-full max-w-11 shrink-0 overflow-hidden rounded-[var(--radius-md)]">
      {cow.imageUrl ? (
        <Image
          src={cow.imageUrl}
          alt={`تصویر ${cow.name}`}
          fill
          sizes="44px"
          className="object-cover"
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