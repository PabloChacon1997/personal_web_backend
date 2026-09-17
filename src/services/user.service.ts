import { bcryptAdapter } from "../config/bcrypt.adapter";
import { User } from "../entities/User";
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

  async updateUser(id: string,data: Partial<User>, avatar?: Buffer) {
    const user = await this.userRepository.findById(id);
    if (!user) throw CustomError.notFound('No existe el usuario');
    try {
      
      if (avatar) {
        const avatarUrl = await uploadToCloudinary(avatar);
        data.avatar = avatarUrl
      }
      if(data.password) {
        const hashPassword = bcryptAdapter.hash(data.password);
        data.password = hashPassword;
      } else {
        delete data.password
      }

      if (data.email) {
        data.email.toLowerCase()
      }
      await this.userRepository.update({
        ...data,
      }, id);
      return "Usuario actualizado correctamente";
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async deleteUser(id: string) {
    const user = await this.userRepository.findById(id);
    if (!user) throw CustomError.notFound('No existe el usuario');
    try {
      await this.userRepository.delete(user.id);
      return "Usuario eliminado correctamente"
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}