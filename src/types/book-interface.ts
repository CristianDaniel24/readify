import { IReview } from "./review-interface";

export interface IBook {
  id: number;
  title: string;
  author: string;
  genre: string;
  publishedYear: number;
  isbn: string;
  description: string;
  coverImage: string;
  reviews: IReview[];
}
