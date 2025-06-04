export default function formatDate(dateString: string): string {
  const date = new Date(dateString);

  // Extract parts
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth is 0-based
  const year = date.getFullYear();

  // Format as dd-mm-yyyy
  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
}
