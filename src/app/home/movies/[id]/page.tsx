import { Card } from "@/components/ui/card";
import { movieService } from "@/services/movie-service";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function MovieDetails({ params }: Readonly<Props>) {
  const { id } = await params;
  const movie = await movieService.findById(+id);

  if (!movie) {
    return null;
  }

  return (
    <div className="grid gap-y-5">
      <Card className="flex justify-center mx-5 px-5 md:mx-28 xl:mx-84">
        <div className="flex-1/2 justify-self-start">
          <div className="space-y-1 text-sm">
            <h3 className="text-xl font-medium leading-none">
              Title: {movie.title}
            </h3>
            <p className="text-xs text-muted-foreground">
              Genero: {movie.genre}
            </p>
            <p className="text-xs text-muted-foreground">
              Autor: {movie.author}
            </p>
            <p className="">Año: {movie.year}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
