import React from "react";

interface ReadingListProps {
  books: string[];
}

export function ReadingList({ books }: ReadingListProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-[28px] mb-8 font-medium">Reading List</h2>
      <ul className="list-disc pl-5 space-y-2 text-[16px] text-muted-foreground">
        {books.map((book, index) => (
          <li key={index}>{book}</li>
        ))}
      </ul>
    </div>
  );
} 