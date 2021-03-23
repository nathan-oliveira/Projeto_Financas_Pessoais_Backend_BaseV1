import { EntityRepository, Repository } from "typeorm";

import { UserDAO } from "@app/domain/models";
import { IUser, IUserCreate, IUserRequestUpdate } from "@app/presentation/usecases";

@EntityRepository(UserDAO)
class UserRepository extends Repository<UserDAO> {
  createUser = async (dataForm: IUser): Promise<IUserCreate> => {
    const result = await this.getUserByEmail(dataForm.email);

    if (result.length === 0) {
      const { name, email, active, nivel } = await this.manager.save(UserDAO, dataForm);
      return { name, email, active, nivel } as IUserCreate;
    } else {
      throw new Error("E-mail informado já está cadastrado!");
    }
  };

  getUserByEmail = async (email: string): Promise<UserDAO[]> => {
    return await this.manager.find(UserDAO, { where: { email } });
  };

  getUserById = async (id: number): Promise<UserDAO[]> => {
    return await this.manager.find(UserDAO, { where: { id } });
  };

  updateUser = async (id: number, dataForm: IUserRequestUpdate): Promise<object> => {
    return await this.manager.update(UserDAO, { id }, dataForm);
  };

  updateFoto = async (id: number, foto: string): Promise<object> => {
    return await this.manager.update(UserDAO, { id }, { foto });
  };
}

export default UserRepository;
