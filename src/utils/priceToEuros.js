export function priceToEuros(priceInCents) {
  const priceInEuro = priceInCents / 100;
  return priceInEuro.toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
