"use client";

import { useRouter } from "next/navigation";
import MovieForm from "../_components/movie-form";
import {
  movieFormDefinition,
  MovieFormType,
} from "@/lib/definitions/movie-form-definition";
import { IMovie } from "@/types/movie-interface";
import { movieService } from "@/services/movie-service";
import { toast } from "sonner";

export default function CreateBook() {
  const router = useRouter();
  const handleSubmit = (values: MovieFormType) => {
    const movie = {
      title: values.title,
      author: values.author,
      genre: values.genre,
      year: values.year.getFullYear(),
    } as IMovie;
    movieService
      .create(movie)
      .then(() => {
        toast.success("Movie created");
        router.push("/home/movies");
      })
      .catch(() => {
        toast.error("Ho something went wrong", {
          description: "There was a probles a problem with your request",
        });
      });
  };
  return (
    <div className="container max-w-5xl mx-auto md:py-10">
      <div className="grid gap-5">
        <h1 className="text-4xl leading-none font-medium">New Movie</h1>
        <MovieForm
          movie={movieFormDefinition.defaultMovie}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
