import { IPet } from "@/types/pet-interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export type PetFormType = z.infer<typeof petFormDefinition.petFormSchema>;

class PetFormDefinition {
  readonly petFormSchema = z.object({
    name: z
      .string()
      .min(2, { message: "Must be at least 2 characters" })
      .max(30),
    owner: z
      .string()
      .min(2, { message: "Must be at least 2 characters" })
      .max(30),
    breed: z
      .string()
      .min(3, { message: "Must be ar least 3 characters" })
      .max(30),
    age: z.string({ message: "Age is required" }),
    birthdayDate: z.date({
      invalid_type_error: "Published year must be a valid date",
    }),
  });

  readonly defaultPet = {
    name: "",
    owner: "",
    breed: "",
    age: "",
    birthdayDate: 0,
  } as IPet;

  public asignDefaultValues(pet: IPet): any {
    const petFormDefaultValues = {
      resolver: zodResolver(this.petFormSchema),
      defaultValues: {
        name: pet.name,
        owner: pet.owner,
        breed: pet.breed,
        age: pet.age,
        birthdayDate:
          pet.birthdayDate === 0
            ? new Date()
            : new Date(pet.birthdayDate, 1, 1),
      },
    };
    return petFormDefaultValues;
  }
}

export const petFormDefinition = new PetFormDefinition();
