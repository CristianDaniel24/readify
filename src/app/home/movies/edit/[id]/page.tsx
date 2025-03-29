"use client";

import { MovieFormType } from "@/lib/definitions/movie-form-definition";
import { movieService } from "@/services/movie-service";
import { IMovie } from "@/types/movie-interface";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import MovieForm from "../../_components/movie-form";

export default function EditMovie() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<IMovie>();

  const handleSubmit = (values: MovieFormType) => {
    const movieUpdate = {
      title: values.title,
      author: values.author,
      genre: values.genre,
      year: values.year.getFullYear(),
    } as IMovie;
    movieService
      .update(+id, movieUpdate)
      .then(() => {
        toast.success("Movie edited");
        router.push("/home/movies");
      })
      .catch(() => {
        toast.error("Uh oh! Something went wrong", {
          description: "There was a problem with your request",
        });
      });
  };

  useEffect(() => {
    movieService.findById(+id).then((movie) => setMovie(movie));
  }, [id]);

  if (!movie) {
    return <span>Loading...</span>;
  }

  return (
    <div className="container max-w-5xl mx-auto md:py-10">
      <div className="grid gap-5">
        <h1 className="text-4xl leading-none font-medium">Edit Book</h1>
        <MovieForm movie={movie} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
