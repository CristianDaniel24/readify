import { ISong } from "@/types/song-interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export type SongFormType = z.infer<typeof songFormDefinition.songFormSchema>;

class SongFormDefinition {
  readonly songFormSchema = z.object({
    name: z
      .string()
      .min(3, { message: "Must be at least 3 characters" })
      .max(30),
    author: z
      .string()
      .min(3, { message: "Must be at least 3 characters" })
      .max(30),
    duration: z.string({ message: "Duration is required" }),
    publicationDate: z.date({
      invalid_type_error: "Published year must be a valid date",
    }),
  });

  readonly defaultSong = {
    name: "",
    author: "",
    duration: "",
    publicationDate: 0,
  } as ISong;

  public asignDefaultValues(song: ISong): any {
    const songFormDefaultValues = {
      Resolver: zodResolver(this.songFormSchema),
      defaultValues: {
        name: song.name,
        author: song.author,
        duration: song.duration,
        publicationDate:
          song.publicationDate === 0
            ? new Date()
            : new Date(song.publicationDate, 1, 1),
      },
    };
    return songFormDefaultValues;
  }
}

export const songFormDefinition = new SongFormDefinition();
