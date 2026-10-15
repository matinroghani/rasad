
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
