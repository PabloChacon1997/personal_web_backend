import { MenuRepository } from "../repositories/menu.repository";
import { CreateMenuDto } from "../schemas/menu.schema";



export class MenuService {
  private menuRepository = new MenuRepository();

  async create(data: CreateMenuDto) {
    return this.menuRepository.create(data);
  }
}