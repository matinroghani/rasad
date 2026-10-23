import {
  Cpu,
  ShieldCheck,
} from "lucide-react";

export default function DiseaseIntegrationNotice() {
  return (
    <aside className="relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--panel-border)] bg-[var(--surface-warm)] p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-[var(--panel-border)] bg-[var(--surface)] text-[var(--accent-green)]">
          <Cpu size={21} />
        </span>

        <div className="min-w-0">
          <h2 className="text-sm font-extrabold text-[var(--text-main)]">
            زیرساخت آماده توسعه
          </h2>

          <p className="mt-1.5 text-xs leading-7 text-[var(--text-muted)]">
            ماژول‌های تشخیصی برای اتصال آینده به مدل‌های
            پردازش تصویر، از جمله PyTorch، OpenCV و YOLO،
            در نظر گرفته شده‌اند. تا پیش از اتصال و اعتبارسنجی
            سرویس واقعی، هیچ نتیجه‌ای به‌عنوان تشخیص خودکار
            بیماری تولید نمی‌شود.
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-start gap-2 border-t border-[var(--panel-border)] pt-3">
        <ShieldCheck
          size={16}
          className="mt-0.5 shrink-0 text-[var(--accent-green)]"
        />

        <p className="text-xs leading-6 text-[var(--text-muted)]">
          شمارنده‌های این صفحه از اطلاعات ثبت‌شده در پایش
          گله محاسبه می‌شوند؛ آمار درمان به معنی تشخیص
          بیماری نیست.
        </p>
      </div>
    </aside>
  );
}