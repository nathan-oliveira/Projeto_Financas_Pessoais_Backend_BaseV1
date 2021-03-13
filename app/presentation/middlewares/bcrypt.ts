import * as bcrypt from "bcrypt"

class BCrypt {
  static async CreatePasswordHash(password: string, password_confirmation: string): Promise<string> {
    if (password !== password_confirmation) throw new Error("Os campos 'Senha' e 'Confirmar Senha' não estão iguais!")

    if (!password || password.length < 6) throw new Error("Favor preencha todos os campos de cadastro!")

    return await bcrypt.hash(password, 8)
  }
}

export default BCrypt
