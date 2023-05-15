export const convertPriceToCents = (price) => {
  const priceInCents = Math.round(price * 100); // convertit le prix en centimes et arrondit pour éviter les erreurs de calcul
  return priceInCents;
};
