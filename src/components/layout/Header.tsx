import HeaderActions from "./components/header/Header-Actions";
import HeaderLogoarea from "./components/header/Header-Logoarea";

export default function Header() {
  return (
    <header
      className={[
        "relative z-10 mb-2 flex flex-wrap items-center justify-between gap-3",
        "overflow-hidden rounded-lg px-4 py-4 sm:px-7",
        "text-(--text-inverse)",
        "bg-[linear-gradient(120deg,var(--surface-dark),var(--accent-green-hover),var(--accent-green),var(--accent-green-light),var(--accent-green),var(--accent-green-hover))]",
        "bg-size-[320%_320%]",
        "animate-[topbarFlow_22s_ease-in-out_infinite]",
        "shadow-[0_8px_26px_rgba(60,90,60,0.2),inset_0_1px_0_rgba(255,255,255,0.12)]",
        "motion-reduce:animate-none",
      ].join(" ")}
    >
      
      <HeaderLogoarea />
      <HeaderActions />
    </header>
  );
}