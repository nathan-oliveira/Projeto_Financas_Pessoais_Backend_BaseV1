import * as bcrypt from "bcrypt";
import { JwT } from "./jsonwebtoken";

export class BCrypt {
  static async CreatePasswordHash(
    password: string,
    password_confirmation: string
  ): Promise<string> {
    if (password !== password_confirmation)
      throw new Error("Os campos 'Senha' e 'Confirmar Senha' não estão iguais!");

    if (!password || password.length < 6)
      throw new Error("Favor preencha todos os campos de cadastro!");

    return await bcrypt.hash(password, 8);
  }

  static async ComparePasswordHash(password: string, user: any): Promise<object> {
    if (!password) throw new Error("Favor preencha todos os campos!");
    if (!user) throw new Error("Usuário e/ou senha inválidos!");
    const compareUser = await bcrypt.compare(password, user.password);

    if (!compareUser) throw new Error("Usuário e/ou senha inválidos!");
    return JwT.createToken(user);
  }
}
