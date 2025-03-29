import { bookService } from "@/services/book-service";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default async function Books() {
  const books = await bookService.getAll();

  return (
    <div className="container max-w-5xl mx-auto py-10">
      <h1 className="text-4xl leading-none font-medium">List of books</h1>
      <DataTable columns={columns} data={books} />
    </div>
  );
}
