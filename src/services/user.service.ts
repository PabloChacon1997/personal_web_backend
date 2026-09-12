import { UserRepository } from "../repositories/user.repository";


export class UserService {
  private userRepository = new UserRepository();

  async findAll(active: string | undefined) {
    if (active === undefined) {
      return await this.userRepository.find();
    }
    if (active === "false") {
      return await this.userRepository.findInactive();
    }
    return await this.userRepository.findActive();
  }
}