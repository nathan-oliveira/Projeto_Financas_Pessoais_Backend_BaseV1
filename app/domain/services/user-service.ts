import { getCustomRepository } from "typeorm";
import { validate } from "class-validator";

import { UserDAO } from "@app/domain/models";
import { UserRepository } from "@app/data/respositories";
import {
  IUser,
  IUserProfile,
  IUserRequestLogin,
  IUserCreate,
  IUserRequestUpdate,
} from "@app/presentation/usecases";

class UserService {
  static async save(dataForm: IUser): Promise<IUserCreate> {
    const userDAO = UserDAO.create(dataForm);
    const errors = await validate(userDAO);

    if (errors.length > 0) throw new Error("Todos os campos deve conter no mínimo 6 caracteres!");
    return getCustomRepository(UserRepository).createUser(userDAO);
  }

  static async getUserByEmail(dataForm: IUserRequestLogin): Promise<UserDAO[]> {
    if (!dataForm.email || !dataForm.password) throw new Error("Favor preencha todos os campos!");
    return await getCustomRepository(UserRepository).getUserByEmail(dataForm.email);
  }

  static async getUserById(id: number): Promise<IUserProfile> {
    const result = await getCustomRepository(UserRepository).getUserById(id);
    if (result.length === 0) throw new Error("Usuário não encontrado!");

    const data: IUserProfile = {
      name: result[0].name,
      email: result[0].email,
      active: result[0].active,
      nivel: result[0].nivel,
      foto: result[0].foto,
    };

    return data;
  }

  static async updateUser(id: number, dataForm: IUserRequestUpdate): Promise<IUserProfile> {
    await this.getUserById(id);
    if (dataForm.password_confirmation) delete dataForm.password_confirmation;

    const result: any = await getCustomRepository(UserRepository).updateUser(id, dataForm);
    if (result.affected !== 1) throw new Error("Não foi possível atualizar o usuário!");

    return await this.getUserById(id);
  }
}

export default UserService;
