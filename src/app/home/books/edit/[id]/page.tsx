"use client";

import { BookFormType } from "@/lib/definitions/book-form-definition";
import { bookService } from "@/services/book-service";
import { IBook } from "@/types/book-interface";
import { useParams, useRouter } from "next/navigation";
import BookForm from "../../_components/book-form";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function EditBook() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<IBook>();

  //Se reciben los valores del formulario
  const handleSubmit = (values: BookFormType) => {
    const bookUpdate = {
      title: values.title,
      author: values.author,
      isbn: values.isbn,
      genre: values.genre,
      publishedYear: values.publishedyear.getFullYear(),
      coverImage: values.coverImage,
      description: values.description,
      reviews: book?.reviews,
    } as IBook;
    bookService
      .update(+id, bookUpdate)
      .then(() => {
        toast.success("Book edited");
        router.push("/home/books");
      })
      .catch(() => {
        toast.error("Uh oh! Something went wrong", {
          description: "There was a problem with your request",
        });
      });
  };

  useEffect(() => {
    bookService.findById(+id).then((book) => setBook(book));
  }, [id]);

  if (!book) {
    return <span>Loading...</span>;
  }

  return (
    <div className="container max-w-5xl mx-auto md:py-10">
      <div className="grid gap-5">
        <h1 className="text-4xl leading-none font-medium">Edit Book</h1>
        <BookForm book={book} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
