import { Book } from "./Book";

/**
 * DTO to add availability of book
 * isAvailable depends of if there is a relation
 * betwen books and users tagged as ActualUser
 * */
export class BookAvailabilityDto {
  bookId: number = 0;
  title: string = "";
  author: string = "";
  isAvailable: boolean | undefined;

  constructor(book: Book, isAvailable: boolean) {
    this.bookId = book.id;
    this.title = book.title;
    this.author = book.author;
    this.isAvailable = isAvailable;
  }
}
