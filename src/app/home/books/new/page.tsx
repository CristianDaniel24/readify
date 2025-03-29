"use client";

import {
  bookFormDefinition,
  BookFormType,
} from "@/lib/definitions/book-form-definition";
import BookForm from "../_components/book-form";
import { IBook } from "@/types/book-interface";
import { IReview } from "@/types/review-interface";
import { bookService } from "@/services/book-service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CreateBook() {
  const router = useRouter();
  const handleSubmit = (values: BookFormType) => {
    const book = {
      title: values.title,
      author: values.author,
      isbn: values.isbn,
      genre: values.genre,
      publishedYear: values.publishedyear.getFullYear(),
      coverImage: values.coverImage,
      description: values.description,
      reviews: [] as IReview[],
    } as IBook;
    bookService
      .create(book)
      .then(() => {
        toast.success("Book created");
        router.push("/home/books");
      })
      .catch(() => {
        toast.error("Uh oh! Something went wrong", {
          description: "There was a probles a problem with your request",
        });
      });
  };

  return (
    <div className="container max-w-5xl mx-auto md:py-10">
      <div className="grid gap-5">
        <h1 className="text-4xl leading-none font-medium">New Book</h1>
        <BookForm
          book={bookFormDefinition.defaultBook}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
