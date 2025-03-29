import { Card } from "@/components/ui/card";
import { petService } from "@/services/pets-service";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function MovieDetails({ params }: Readonly<Props>) {
  const { id } = await params;
  const pet = await petService.findById(+id);

  if (!pet) {
    return null;
  }

  return (
    <div className="grid gap-y-5">
      <Card className="flex justify-center mx-5 px-5 md:mx-28 xl:mx-84">
        <div className="flex-1/2 justify-self-start">
          <div className="space-y-1 text-sm">
            <h3 className="text-xl font-medium leading-none">
              Name: {pet.name}
            </h3>
            <p className="text-xs text-muted-foreground">Owner: {pet.owner}</p>
            <p className="text-xs text-muted-foreground">Breed: {pet.breed}</p>
            <p className="text-xs text-muted-foreground">Age: {pet.age}</p>
            <p className="">Año: {pet.birthdayDate}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
