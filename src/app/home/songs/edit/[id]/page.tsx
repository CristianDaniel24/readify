"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ISong } from "@/types/song-interface";
import { SongFormType } from "@/lib/definitions/song-form-definition";
import { songService } from "@/services/song-service";
import SongForm from "../../_components/song-form";

export default function EditSong() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [song, setSong] = useState<ISong>();

  const handleSubmit = (values: SongFormType) => {
    const songUpdate = {
      name: values.name,
      author: values.author,
      duration: values.duration,
      publicationDate: values.publicationDate.getFullYear(),
    } as ISong;
    songService
      .update(+id, songUpdate)
      .then(() => {
        toast.success("Song edited");
        router.push("/home/songs");
      })
      .catch(() => {
        toast.error("Uh oh! Something went wrong", {
          description: "There was a problem with your request",
        });
      });
  };

  useEffect(() => {
    songService.fingById(+id).then((song) => setSong(song));
  }, [id]);

  if (!song) {
    return <span>Loading...</span>;
  }

  return (
    <div className="container max-w-5xl mx-auto md:py-10">
      <div className="grid gap-5">
        <h1 className="text-4xl leading-none font-medium">Edit Song</h1>
        <SongForm song={song} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
