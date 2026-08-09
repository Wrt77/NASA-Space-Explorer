export function formatDate(date) {
  return new Date(date).toLocaleDateString(
    "th-TH",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );
}