// date-utils.js

export function formatDate(date) {
  return date.toLocaleDateString(undefined, {
    year: "2-digit",
    month: "numeric",
    day: "numeric",
  });
}
