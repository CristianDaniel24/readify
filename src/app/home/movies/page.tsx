import { movieService } from "@/services/movie-service";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default async function Movies() {
  const movies = await movieService.getAll();

  return (
    <div className="container max-w-5xl mx-auto py-10">
      <h1 className="text-4xl leading-none font-medium">List of movies:</h1>
      <DataTable columns={columns} data={movies} />
    </div>
  );
}
