export default function getPageNumbers(
  currentPage: number,
  totalPages: number
): number[] {
  const maxVisiblePages = 5;

  if (totalPages <= maxVisiblePages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, 5];
  }

  if (currentPage >= totalPages - 2) {
    return Array.from({ length: 5 }, (_, i) => totalPages - 4 + i);
  }

  return Array.from({ length: 5 }, (_, i) => currentPage - 2 + i);
}
