import { getCustomRepository } from "typeorm";
import { validate } from "class-validator";

import { UserDAO } from "@app/domain/models";
import { UserRepository } from "@app/data/respositories";
import { IUser, IUserRequestLogin } from "@app/presentation/usecases";

class UserService {
  static async save(dataForm: IUser): Promise<object> {
    const userDAO = UserDAO.create(dataForm);
    const errors = await validate(userDAO);

    if (errors.length > 0) throw new Error("Todos os campos deve conter no mínimo 6 caracteres!");
    return getCustomRepository(UserRepository).createUser(userDAO);
  }

  static async getUserByEmail(dataForm: IUserRequestLogin): Promise<UserDAO[]> {
    if (!dataForm.email || !dataForm.password) throw new Error("Favor preencha todos os campos!");
    return await getCustomRepository(UserRepository).getUserByEmail(dataForm.email);
  }
}

export default UserService;
