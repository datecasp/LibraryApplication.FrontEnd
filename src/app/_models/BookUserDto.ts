/**
 *  DTO to manage basic info about books and users relations
 *  FK bookId and userID
 *  actualUser is a flag
 *    True -> User has now the book
 *    False -> User had the book in the past, but not now
 * */
export class BookUserDto {
  bookId: number | undefined;
  userId: number | undefined;
  actualUser: boolean = true;
}
