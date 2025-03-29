import { IMovie } from "@/types/movie-interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export type MovieFormType = z.infer<typeof movieFormDefinition.movieFormSchema>;

class MovieFormDefinition {
  readonly movieFormSchema = z.object({
    title: z
      .string()
      .min(3, { message: "Must be at least 3 characters" })
      .max(30),
    author: z.string({ message: "Author is required" }).min(3).max(30),
    genre: z.string({ message: "Genre is required" }).min(3).max(30),
    year: z.date({
      invalid_type_error: "Published year must be a valid date",
    }),
  });

  readonly defaultMovie = {
    title: "",
    author: "",
    genre: "",
    year: 0,
  } as IMovie;

  public asignDefaultValues(movie: IMovie): any {
    const movieFormDefaultValues = {
      resolver: zodResolver(this.movieFormSchema),
      defaultValues: {
        title: movie.title,
        author: movie.author,
        genre: movie.genre,
        year: movie.year === 0 ? new Date() : new Date(movie.year, 1, 1),
      },
    };
    return movieFormDefaultValues;
  }
}

export const movieFormDefinition = new MovieFormDefinition();
