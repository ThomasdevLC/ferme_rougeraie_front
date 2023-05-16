export const convertPriceToCents = (price) => {
  let priceInEuro = parseFloat(price);
  if (isNaN(priceInEuro)) {
    priceInEuro = parseFloat(price.replace(",", ".")); // convertit le prix en euros en nombre décimal
  }
  const priceInCents = Math.round(priceInEuro * 100); // convertit le prix en centimes et arrondit pour éviter les erreurs de calcul
  return priceInCents;
};
