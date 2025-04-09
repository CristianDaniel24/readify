import { getApiUrl } from "@/lib/utils";
import { ISong } from "@/types/song-interface";

class SongService {
  private readonly url: string;

  constructor() {
    this.url = `${getApiUrl()}/song`;
  }

  async getAll(): Promise<ISong[]> {
    const res = await fetch(this.url);
    const song = await res.json();
    return song;
  }

  async findById(id: number): Promise<ISong | undefined> {
    const res = await fetch(`${this.url}/${id}`);
    const song = await res.json();
    return song;
  }

  async create(song: ISong): Promise<ISong> {
    const res = await fetch(this.url, {
      method: "POST",
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify(song),
    });
    const restSong = await res.json();
    return restSong;
  }

  async update(id: number, song: ISong): Promise<ISong> {
    const res = await fetch(`${this.url}/${id}`, {
      method: "PUT",
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify(song),
    });
    const resSong = res.json();
    return resSong;
  }
}

export const songService = new SongService();
