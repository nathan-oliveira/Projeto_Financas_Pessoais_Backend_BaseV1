export type IUser = {
  name: string;
  email: string;
  password: string;
  foto: string;
  active?: boolean;
  nivel?: number;
};

export type IUserRequestCreate = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type IUserRequestLogin = {
  email: string;
  password: string;
};
