import { Newsletter } from "../entities/Newsletter";
import { NewsletterRepository } from "../repositories/newsletter.repository";
import { SubscribeDto } from "../schemas/newsletter.schema";
import { CustomError } from "../utils/custom.error";


export class NewsletterService {
  private newsletterRepository = new NewsletterRepository();

  async subscribe(data: SubscribeDto) {
    const existing = await this.newsletterRepository.findByEmail(data.email);
    if (existing) {
      if (existing.active) throw CustomError.conflict('Este correo ya esta suscrito');
      // await this.newsletterRepository
      return "Su suscripcion ha sido reactivada"
    }
    this.newsletterRepository.create(data)
    return "Su suscripcion se ha registrado correctamente";
  }

  async getAll(page: number, limit: number) {
    const [subscribers, total] = await this.newsletterRepository.findAll(page, limit);
    return {
      data: subscribers,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total/limit)
      }
    }
  }

  async delete(id: Newsletter['id']) {
    const subscriber = await this.newsletterRepository.findById(id);
    if (!subscriber) throw CustomError.notFound('Suscriptor no encontrado');
    await this.newsletterRepository.delete(id);
    return "Suscripcion eliminada";
  }
}