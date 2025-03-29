"use client";

import { movieService } from "@/services/movie-service";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { IPet } from "@/types/pets-interface";
import { PetFormType } from "@/lib/definitions/pet-form-definition";
import { petService } from "@/services/pets-service";
import PetForm from "../../_components/pet-form";

export default function EditMovie() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [pet, setPet] = useState<IPet>();

  const handleSubmit = (values: PetFormType) => {
    const petUpdate = {
      name: values.name,
      owner: values.owner,
      breed: values.breed,
      age: values.age,
      birthdayDate: values.birthdayDate.getFullYear(),
    } as IPet;
    petService
      .update(+id, petUpdate)
      .then(() => {
        toast.success("Pet edited");
        router.push("/home/pets");
      })
      .catch(() => {
        toast.error("Uh oh! Something went wrong", {
          description: "There was a problem with your request",
        });
      });
  };

  useEffect(() => {
    petService.findById(+id).then((pet) => setPet(pet));
  }, [id]);

  if (!pet) {
    return <span>Loading...</span>;
  }

  return (
    <div className="container max-w-5xl mx-auto md:py-10">
      <div className="grid gap-5">
        <h1 className="text-4xl leading-none font-medium">Edit Book</h1>
        <PetForm pet={pet} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
