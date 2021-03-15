export type IJwT = {
  id: number;
  name: string;
  email: string;
  nivel: string;
  foto: string;
};

export type IJwTPayload = {
  id: number;
  iat: number;
  exp: number;
};
