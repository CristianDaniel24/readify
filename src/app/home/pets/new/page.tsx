"use client";

import { useRouter } from "next/navigation";
import PetForm from "../_components/pet-form";
import { toast } from "sonner";
import {
  petFormDefinition,
  PetFormType,
} from "@/lib/definitions/pet-form-definition";
import { IPet } from "@/types/pets-interface";
import { petService } from "@/services/pets-service";

export default function CreatePet() {
  const router = useRouter();
  const handleSubmit = (values: PetFormType) => {
    const pet = {
      name: values.name,
      owner: values.owner,
      breed: values.breed,
      age: values.age,
      birthdayDate: values.birthdayDate.getFullYear(),
    } as IPet;
    petService
      .create(pet)
      .then(() => {
        toast.success("Pet created");
        router.push("/home/pets");
      })
      .catch(() => {
        toast.error("Ho something went wrong", {
          description: "There was a probles a problem with your request",
        });
      });
  };
  return (
    <div className="container max-w-5xl mx-auto md:py-10">
      <div className="grid gap-5">
        <h1 className="text-4xl leading-none font-medium">New Pet</h1>
        <PetForm pet={petFormDefinition.defaultPet} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
