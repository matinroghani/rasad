
export function formatHerdValue(
  value: number | null | undefined,
  suffix = "",
): string {
  if (value == null) return "—";

  const formattedValue = value.toLocaleString("fa-IR");

  return suffix ? `${formattedValue} ${suffix}` : formattedValue;
}

export function formatHerdCount(value: number): string {
  return value.toLocaleString("fa-IR");
}

const MAX_HERD_IMAGES = 20;
const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

export function validateHerdImages(
  files: File[],
): string | null {
  if (files.length === 0) {
    return "لطفاً حداقل یک تصویر انتخاب کنید.";
  }

  if (files.length > MAX_HERD_IMAGES) {
    return `حداکثر ${MAX_HERD_IMAGES} تصویر را می‌توانید هم‌زمان انتخاب کنید.`;
  }

  for (const file of files) {
    if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
      return `فرمت تصویر «${file.name}» پشتیبانی نمی‌شود. فقط JPG، PNG و WebP مجاز هستند.`;
    }

    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      return `حجم تصویر «${file.name}» بیشتر از ۱۰ مگابایت است.`;
    }

    if (file.size === 0) {
      return `فایل «${file.name}» خالی است.`;
    }
  }

  return null;
}
