import { AppDataSource } from "../config/database";
import { User } from "../entities/User";
import { removeUndefined } from "../utils/removeUndefined";


export class UserRepository {
  private repository = AppDataSource.getRepository(User);

  findByEmail(email: string) {
    return this.repository.findOne({ where: { email } });
  }

  create(data: Partial<User>) {
    const user = this.repository.create(data);
    return this.repository.save(user);
  }

  findById(id: string) {
    return this.repository.findOne({ where: { id } });
  }

  async update(data: Partial<User>, id: string) {
    const cleanData = removeUndefined(data);
    await this.repository.update(id,cleanData);
    return this.findById(id);
  }

  async delete(id: string) {
    const result = this.repository.delete(id);
    return (await result).affected !== 0
  }

  find() {
    return this.repository.find();
  }

  findInactive() {
    return this.repository.find({ where: { active: false } });
  }

  findActive() {
    return this.repository.find({ where: { active: true } });
  }
}