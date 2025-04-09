import { DataTable } from "./data-table";
import { columns } from "./columns";
import { songService } from "@/services/song-service";

export default async function Songs() {
  const song = await songService.getAll();

  return (
    <div className="container max-w-5xl mx-auto py-10">
      <h1 className="text-4xl leading-none font-medium">List of songs:</h1>
      <DataTable columns={columns} data={song} />
    </div>
  );
}
