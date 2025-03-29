import { getApiUrl } from "@/lib/utils";
import { IMovie } from "@/types/movie-interface";

class MovieService {
  private readonly url: string;

  constructor() {
    this.url = `${getApiUrl()}/movie`;
  }

  async getAll(): Promise<IMovie[]> {
    const res = await fetch(this.url);
    const movie = await res.json();
    return movie;
  }

  async findById(id: number): Promise<IMovie | undefined> {
    const res = await fetch(`${this.url}/${id}`);
    const movie = await res.json();
    return movie;
  }

  async create(movie: IMovie): Promise<IMovie> {
    const res = await fetch(this.url, {
      method: "POST",
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify(movie),
    });
    const restMovie = await res.json();
    return restMovie;
  }

  async update(id: number, movie: IMovie): Promise<IMovie> {
    const res = await fetch(`${this.url}/${id}`, {
      method: "PUT",
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify(movie),
    });
    const resMovie = res.json();
    return resMovie;
  }
}

export const movieService = new MovieService();
