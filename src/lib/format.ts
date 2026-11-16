/** "$1,234" or "$12.34" — AUD, en-AU grouping, no currency code. */
export function aud(amount: number, digits = 0): string {
  const factor = 10 ** digits;
  const rounded = Math.round(amount * factor) / factor;
  const sign = rounded < 0 ? "-" : "";
  const [whole, frac = ""] = Math.abs(rounded).toFixed(digits).split(".");
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return digits === 0 ? `${sign}$${grouped}` : `${sign}$${grouped}.${frac}`;
}

/** Dollars per litre to two places, e.g. "$2.19". */
export function perLitre(audPerLitre: number): string {
  return `$${audPerLitre.toFixed(2)}`;
}
