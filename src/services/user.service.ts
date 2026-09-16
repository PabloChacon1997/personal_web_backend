import { bcryptAdapter } from "../config/bcrypt.adapter";
import { UserRepository } from "../repositories/user.repository";
import { CreateUserDto } from "../schemas/user.schema";
import { CustomError } from "../utils/custom.error";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";


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

  async createUser(data: CreateUserDto, avatar?: Buffer) {
    const user = await this.userRepository.findByEmail(data.email);
    if (user) throw CustomError.conflict('Ya existe un usuario con este email');
    try {
      let avatarUrl: string = '';
      if (avatar) {
        avatarUrl = await uploadToCloudinary(avatar);
      } 
      const hashPassword = bcryptAdapter.hash(data.password);
      await this.userRepository.create({
        ...data,
        email: data.email.toLowerCase(),
        password: hashPassword,
        avatar: avatarUrl
      });
      return "Usuario creado correctamente";
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}