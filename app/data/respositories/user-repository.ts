import { EntityRepository, Repository } from "typeorm"

import { UserDAO } from "@app/domain/models"
import { IUser } from "@app/presentation/usecases"

@EntityRepository(UserDAO)
class UserRepository extends Repository<UserDAO> {

  createUser = async (dataForm: IUser): Promise<object> => {
    const usuario = await this.getUser(dataForm.email)

    if (usuario.length === 0) {
      const { name, email, active, nivel } = await this.manager.save(UserDAO, dataForm);
      return { name, email, active, nivel }
    } else {
      throw new Error('E-mail informado já está cadastrado!')
    }
  }

  getUser = async (email: string): Promise<UserDAO[]> => {
    return await this.manager.find(UserDAO, { where: { email } })
  }

}

export default UserRepository;
