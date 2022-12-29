import { Category } from "./Category";

/**
 *  DTO to manage categories
 *  Adds isSelected flag to a category
 *  isSelected is a flag for add/remove funcionality
 *  and UI purposes
 * */
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
