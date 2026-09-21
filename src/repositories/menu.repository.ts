import { AppDataSource } from "../config/database";
import { Menu } from "../entities/Menu";



export class MenuRepository {
  private repository = AppDataSource.getRepository(Menu);

  create(data: Partial<Menu>) {
    const menu = this.repository.create(data);
    return this.repository.save(menu);
  }
  
  findAll() {
    return this.repository.find({
      order: { position: 'ASC' }
    })
  }

  findAllActives() {
    return this.repository.find({ 
      where: { active: true },
      order: { position: 'ASC' }
    })
  }

  findAllInactives() {
    return this.repository.find({ 
      where: { active: false },
      order: { position: 'ASC' }
    })
  }

  findById(id: string) {
    return this.repository.findOne({ where: { id } })
  }

  async updateMenu(id: string, data: Partial<Menu>) {
    await this.repository.update(id, data)
    return this.findById(id)
  }

  async deleteMenu(id: string) {
    await this.repository.delete(id);
  }
}