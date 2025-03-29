import { DataTable } from "./data-table";
import { columns } from "./columns";
import { petService } from "@/services/pets-service";

export default async function Pets() {
  const pets = await petService.getAll();

  return (
    <div className="container max-w-5xl mx-auto py-10">
      <h1 className="text-4xl leading-none font-medium">List of pets:</h1>
      <DataTable columns={columns} data={pets} />
    </div>
  );
}
