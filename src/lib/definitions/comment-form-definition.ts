import { z } from "zod";

export type CommentFormType = z.infer<
  typeof commentDefinition.commentFormSchema
>;

class CommentFormDefinition {
  readonly commentFormSchema = z.object({
    comment: z.string({ message: "Please enter the comment" }),
  });
}

export const commentDefinition = new CommentFormDefinition();
