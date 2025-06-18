"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "";
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();

    // Preserve query if it exists
    if (query) params.set("query", query);

    // Set category name if selected
    if (category) {
      params.set("category", category);
    }

    router.push(`/products?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        className="p-2 border rounded"
      />
      <button type="submit" className="ml-2 p-2 bg-red-400 text-white rounded">
        Search
      </button>
    </form>
  );
}
