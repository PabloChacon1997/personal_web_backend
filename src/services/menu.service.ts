import { MenuRepository } from "../repositories/menu.repository";
import { CreateMenuDto, UpdateMenuDto } from "../schemas/menu.schema";
import { CustomError } from "../utils/custom.error";



export class MenuService {
  private menuRepository = new MenuRepository();

  async create(data: CreateMenuDto) {
    return this.menuRepository.create(data);
  }

  async getAll(active: string | undefined) {
    if (active === undefined) {
      return await this.menuRepository.findAll();
    }
    if (active === "false") {
      return await this.menuRepository.findAllInactives();
    }
    return await this.menuRepository.findAllActives();
  }

  async updateMenu(id: string, data: UpdateMenuDto) {
    const menu = await this.menuRepository.findById(id);
    if (!menu) throw CustomError.notFound('No existe el menu');
    await this.menuRepository.updateMenu(menu.id, data);
    return "Menu actualizado correctamente"
  }

  async deleteMenu(id: string) {
    const menu = await this.menuRepository.findById(id);
    if (!menu) throw CustomError.notFound('No existe el menu');
    await this.menuRepository.deleteMenu(menu.id);
    return "Menu eliminado correctamente"
  }
}