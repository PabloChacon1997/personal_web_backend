import { bcryptAdapter } from "../config/bcrypt.adapter";
import { JwtAdapter } from "../config/jwt.adapter";
import { UserRepository } from "../repositories/user.repository";
import { LoginInput, RefreshTokenInput, RegisterInput } from "../schemas/auth.schema";
import { CustomError } from "../utils/custom.error";



export class AuthService {
  private userRepository = new UserRepository();

  async register(data: RegisterInput) {
    const existsUser = await this.userRepository.findByEmail(data.email);
    if (existsUser) throw CustomError.conflict('Ya existe una cuenta con este email')
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
      throw CustomError.internalServer(`${error}`);
    }

  }

  async login(data: LoginInput) {
    const user = await this.userRepository.findByEmail(data.email.toLowerCase());
    if (!user) throw CustomError.badRequest('Credenciales incorrectas');
    
    const isMatching = bcryptAdapter.compare(data.password, user.password)
    if(!isMatching) throw CustomError.badRequest('Credenciales incorrectas');
    if (!user.active) throw CustomError.unauthorized('Usuario no activado');
    const {password, ...userEntity} = user;

    const token = await JwtAdapter.generateToken({id: user.id});
    const refresh = await JwtAdapter.refreshToken({id: user.id});
    return {
      user: userEntity,
      token,
      refresh
    };
    
  }

  async refreshToken(data: RefreshTokenInput) {
    try {
      const payload = await JwtAdapter.validateToken(data.refresh) as any;
      if (!payload) throw CustomError.unauthorized('Refresh Token Inválido');
      const user = await this.userRepository.findById(payload.id);
      if (!user) throw CustomError.internalServer('Error en el servidor');
      const token = await JwtAdapter.generateToken({id: user.id});
      return token
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }

  }
}