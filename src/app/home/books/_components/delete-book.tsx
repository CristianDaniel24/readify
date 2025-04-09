import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { bookService } from "@/services/book-service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
  id: number;
}

export default function DeleteBookDialog({ id }: Readonly<Props>) {
  const router = useRouter();
  const handleDelete = async () => {
    const result = await bookService.delete(id);
    if (result) {
      toast.success("Book deleted!");
      router.refresh();
    } else {
      toast.error("Uh oh! Something went wrong.", {
        description: "There was a problem with your request",
      });
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <span>Delete</span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
