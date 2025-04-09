import { getApiUrl } from "@/lib/utils";
import { IGenre } from "@/types/genre.interface";

class GenreService {
  private readonly url = `${getApiUrl()}/genres`;

  async getAll(): Promise<IGenre[]> {
    const res = await fetch(this.url);
    const data = await res.json();
    return data;
  }
}

export const genreService = new GenreService();
