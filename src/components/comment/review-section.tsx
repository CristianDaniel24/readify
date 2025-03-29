"use client";

import { IBook } from "@/types/book-interface";
import { useState } from "react";
import Review from "./review";
import Comment from "./comment";

interface Props {
  propBook: IBook;
}

export default function ReviewSection({ propBook }: Readonly<Props>) {
  const [book, setBook] = useState<IBook>(propBook);
  const sortedReviews = book.reviews.toSorted((r1, r2) => r2.id - r1.id);

  return (
    <div className="flex flex-col mx-5 px-5 md:mx-28 xl:mx-48 rounded-md md:rounded-md xl:rounded-xl ">
      <div className="py-3">
        <h1 className="text-xl font-bold">Reviews</h1>
      </div>
      <div className="grid gap-y-3">
        {sortedReviews.map((r) => (
          <div key={r.id} className="border-b-2 last:border-b-0 pb-2">
            <Review review={r} />
          </div>
        ))}
      </div>
      <div className="mt-3">{<Comment book={book} setBook={setBook} />}</div>
    </div>
  );
}
