import { bcryptAdapter } from "../config/bcrypt.adapter";
import { UserRepository } from "../repositories/user.repository";
import { RegisterInput } from "../schemas/auth.schema";



export class AuthService {
  private userRepository = new UserRepository();

  async register(data: RegisterInput) {
    const existsUser = await this.userRepository.findByEmail(data.email);
    if (existsUser) throw new Error('Usuario ya existe');
    try {
      const hashPassword = bcryptAdapter.hash(data.password);
      
      const user = await this.userRepository.create({
        ...data,
        role: 'user',
        avatar: '',
        email: data.email.toLowerCase(),
        password: hashPassword
      });

      return user;

    } catch (error) {
      throw new Error('Hubo un error');
    }

  }
}