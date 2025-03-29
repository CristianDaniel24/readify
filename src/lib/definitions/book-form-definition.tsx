import { IBook } from "@/types/book-interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export type BookFormType = z.infer<typeof bookFormDefinition.bookFormSchema>;

class BookFormDefinition {
  readonly bookFormSchema = z.object({
    title: z
      .string()
      .min(3, { message: "Must be at least 3 characters" })
      .max(30),
    author: z.string().min(5, { message: "Must be at least 5 characters " }),
    genre: z.string({ message: "Genre is required" }),
    publishedyear: z.date({
      invalid_type_error: "Published year must be a valid date",
    }),
    isbn: z.string().min(5),
    description: z.string(),
    coverImage: z.string().url().startsWith("https://images.unsplash.com", {
      message: "Only images from unsplash.com are allowed",
    }),
  });

  readonly defaultBook = {
    title: "",
    author: "",
    genre: "",
    publishedYear: 0,
    isbn: "",
    description: "",
    coverImage: "",
  } as IBook;

  public asignDefaultValues(book: IBook): any {
    const bookFormDefaultValues = {
      resolver: zodResolver(this.bookFormSchema),
      defaultValues: {
        title: book.title,
        author: book.author,
        genre: book.genre,
        publishedYear:
          book.publishedYear === 0
            ? new Date()
            : new Date(book.publishedYear, 1, 1),
        isbn: book.isbn,
        description: book.description,
        coverImage: book.coverImage,
      },
    };
    return bookFormDefaultValues;
  }
}

export const bookFormDefinition = new BookFormDefinition();
