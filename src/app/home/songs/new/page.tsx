"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  songFormDefinition,
  SongFormType,
} from "@/lib/definitions/song-form-definition";
import { ISong } from "@/types/song-interface";
import { songService } from "@/services/song-service";
import SongForm from "../_components/song-form";

export default function CreateSong() {
  const router = useRouter();
  const handleSubmit = (values: SongFormType) => {
    const song = {
      name: values.name,
      author: values.author,
      duration: values.duration,
      publicationDate: values.publicationDate.getFullYear(),
    } as ISong;
    songService
      .create(song)
      .then(() => {
        toast.success("Song created");
        router.push("/home/songs");
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
        <h1 className="text-4xl leading-none font-medium">New Song</h1>
        <SongForm
          song={songFormDefinition.defaultSong}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
