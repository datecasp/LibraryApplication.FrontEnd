import { Category } from "./Category";

export class CategorySelectedDto {
  id: number = 0;
  categoryName: string = "";
  isSelected: boolean = false;

  constructor(category: Category, isSelected: boolean) {
    this.id = category.id;
    this.categoryName = category.categoryName;
    this.isSelected = isSelected;
  }
}
