import { AppDataSource } from "../config/database";
import { Newsletter } from "../entities/Newsletter";


export class NewsletterRepository {
  private repository = AppDataSource.getRepository(Newsletter);

  findAll(page: number, limit: number) {
    return this.repository.findAndCount({
      order: { createdAt: 'desc' },
      skip: (page -1 ) * limit,
      take: limit
    })
  }

  findById(id: Newsletter['id']) {
    return this.repository.findOne({ where: { id } })
  }

  findByEmail(email: Newsletter['email']) {
    return this.repository.findOne({ where: { email } });
  }

  async create(data: Partial<Newsletter>) {
    const subscriber = this.repository.create(data);
    return this.repository.save(subscriber);    
  }

  async delete(id: Newsletter['id']) {
    await this.repository.delete(id);
  }
}