import { z } from "zod";

export type PetFormType = z.infer<typeof >;

class PetFormDefinition {
    readonly petFormSchema = z.object({
        name: z.string().min(2, {message: "Must be at least 3 characters"})
        .max(30),
    })
}