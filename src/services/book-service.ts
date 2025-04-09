import { getApiUrl } from "@/lib/utils";
import { IBook } from "@/types/book-interface";

class BookService {
  private readonly url: string;

  constructor() {
    this.url = `${getApiUrl()}/book`;
  }

  async getAll(): Promise<IBook[]> {
    const res = await fetch(this.url);
    const books = await res.json();
    return books;
  }

  async findById(id: number): Promise<IBook | undefined> {
    const res = await fetch(`${this.url}/${id}`);
    const book = await res.json();
    return book;
  }

  async create(book: IBook): Promise<IBook> {
    const res = await fetch(this.url, {
      method: "POST",
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify(book),
    });
    const restBook = await res.json();
    return restBook;
  }

  async update(id: number, book: IBook): Promise<IBook> {
    const res = await fetch(`${this.url}/${id}`, {
      method: "PUT",
      headers: { "Content-type": "Application/json" },
      body: JSON.stringify(book),
    });
    const resBook = res.json();
    return resBook;
  }

  async delete(id: number): Promise<boolean> {
    try {
      await fetch(`${this.url}/${id}`, { method: "DELETE" });
      return Promise.resolve(true);
    } catch (e) {
      return Promise.resolve(false);
    }
  }
}
export const bookService = new BookService();
