export class Recipe {
  public Name: string;
  public Description: string;
  public ImagePath: string;

  constructor(name: string, description: string, imagePath: string) {
    this.Name = name;
    this.ImagePath = imagePath;
    this.Description = description;
  }
}
