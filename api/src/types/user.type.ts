export type UserRegisterArgs = {
  name: string;
  email: string;
  profile: string;
  password: string;
};

export type UserLoginArgs = {
  email: string;
  password: string;
};
