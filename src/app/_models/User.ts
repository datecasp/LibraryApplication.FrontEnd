export class User {
  id: number;
  userName: string;
  isActive: boolean;

  constructor(
    id: number,
    userName: string,
    isActive: boolean)
  {
    this.id = id;
    this.userName = userName;
    this.isActive = isActive;
  }
}
