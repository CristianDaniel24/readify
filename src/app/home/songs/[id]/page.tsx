import { Card } from "@/components/ui/card";
import { songService } from "@/services/song-service";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function SongDetails({ params }: Readonly<Props>) {
  const { id } = await params;
  const song = await songService.findById(+id);

  if (!song) {
    return null;
  }

  return (
    <div className="grid gap-y-5">
      <Card className="flex justify-center mx-5 px-5 md:mx-28 xl:mx-84">
        <div className="flex-1/2 justify-self-start">
          <div className="space-y-1 text-sm">
            <h3 className="text-xl font-medium leading-none">
              Name: {song.name}
            </h3>
            <p className="text-xs text-muted-foreground">
              Author: {song.author}
            </p>
            <p className="text-xs text-muted-foreground">
              Duration: {song.duration}
            </p>
            <p className="text-xs text-muted-foreground">
              Fecha de publicacion: {song.publicationDate}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
