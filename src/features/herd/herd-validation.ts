export const MAX_FILE_SIZE_MB = 10;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
export const MAX_FILES = 20;

const IMAGE_TYPE_PREFIX = "image/";

export function validateHerdImages(files: File[]): string | null {
  const count = files.length;

  if (count === 0) {
    return "حداقل یک تصویر انتخاب کنید.";
  }

  if (count > MAX_FILES) {
    return `حداکثر می‌توانید ${MAX_FILES} تصویر انتخاب کنید.`;
  }

  for (let i = 0; i < count; i++) {
    const file = files[i];

    if (!file.type.startsWith(IMAGE_TYPE_PREFIX)) {
      return `فایل «${file.name}» تصویر معتبر نیست.`;
    }

    if (file.size === 0) {
      return `فایل «${file.name}» خالی است.`;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return `حجم فایل «${file.name}» بیشتر از ${MAX_FILE_SIZE_MB} مگابایت است.`;
    }
  }

  return null;
}