import { getApiUrl } from "@/lib/utils";
import { IPet } from "@/types/pets-interface";

class PetService {
  private readonly url: string;

  constructor() {
    this.url = `${getApiUrl()}/pet`;
  }

  async getAll(): Promise<IPet[]> {
    const res = await fetch(this.url);
    const movie = await res.json();
    return movie;
  }

  async findById(id: number): Promise<IPet | undefined> {
    const res = await fetch(`${this.url}/${id}`);
    const movie = await res.json();
    return movie;
  }

  async create(pet: IPet): Promise<IPet> {
    const res = await fetch(this.url, {
      method: "POST",
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify(pet),
    });
    const restPet = await res.json();
    return restPet;
  }

  async update(id: number, pet: IPet): Promise<IPet> {
    const res = await fetch(`${this.url}/${id}`, {
      method: "PUT",
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify(pet),
    });
    const resPet = res.json();
    return resPet;
  }
}

export const petService = new PetService();
