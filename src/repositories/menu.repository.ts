import { AppDataSource } from "../config/database";
import { Menu } from "../entities/Menu";



export class MenuRepository {
  private repository = AppDataSource.getRepository(Menu);

  create(data: Partial<Menu>) {
    const menu = this.repository.create(data);
    return this.repository.save(menu);
  }
}