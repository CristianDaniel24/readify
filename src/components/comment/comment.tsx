import {
  commentDefinition,
  CommentFormType,
} from "@/lib/definitions/comment-form-definition";
import { IBook } from "@/types/book-interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { IPerson } from "@/types/person-interface";
import { IReview } from "@/types/review-interface";
import { bookService } from "@/services/book-service";

interface Props {
  book: IBook;
  setBook: Dispatch<SetStateAction<IBook>>;
}

export default function Comment({ book, setBook }: Readonly<Props>) {
  const form = useForm<CommentFormType>({
    resolver: zodResolver(commentDefinition.commentFormSchema),
    defaultValues: {
      comment: "",
    },
  });

  const handleSubmit = async (values: CommentFormType) => {
    const person = {} as IPerson;
    const review = {
      id: book.reviews.length + 1,
      comment: values.comment,
      userId: person.id,
      date: new Date(),
    } as IReview;
    book.reviews.push(review);
    setBook({ ...book });
    await bookService.update(book.id, book);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-y-3">
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Enter your comment here."
                  {...field}
                ></Textarea>
              </FormControl>
            </FormItem>
          )}
        />
        <div className="justify-self-end">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
