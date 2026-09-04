import { AppDataSource } from "../config/database";
import { User } from "../entities/User";


export class UserRepository {
  private repository = AppDataSource.getRepository(User);

  findByEmail(email: string) {
    return this.repository.findOne({ where: { email } });
  }

  create(data: Partial<User>) {
    const user = this.repository.create(data);
    return this.repository.save(user);
  }
}