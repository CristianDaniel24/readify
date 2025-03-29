import ReviewSection from "@/components/comment/review-section";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { bookService } from "@/services/book-service";
import Image from "next/image";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function BookDetails({ params }: Readonly<Props>) {
  const { id } = await params;
  const book = await bookService.findById(+id);

  if (!book) {
    return null;
  }

  return (
    <div className="grid gap-y-5">
      <Card className="flex justify-center mx-5 px-5 md:mx-28 xl:mx-48">
        <div className="flex space-x-5">
          <div>
            <Image
              src={book.coverImage}
              alt={book.title}
              width={250}
              height={500}
              className={cn(
                "h-auto w-auto object-cover transition-all hover:scale-105 aspect-[3/4] overflow-hidden rounded-md"
              )}
            />
          </div>
          <div className="flex-1/2 justify-self-start">
            <div className="space-y-1 text-sm">
              <h3 className="text-xl font-medium leading-none">{book.title}</h3>
              <p className="text-xs text-muted-foreground">
                {book.author} - {book.publishedYear}
              </p>
              <p className="">{book.description}</p>
            </div>
          </div>
        </div>
      </Card>
      {<ReviewSection propBook={{ ...book }} />}
    </div>
  );
}
