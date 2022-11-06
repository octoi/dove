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

// * all fields starts with `new` will have default data of user if he didn't update any of fields
export interface UserUpdateArgs {
  newName?: string;
  newEmail?: string;
  newProfile?: string;
  newPassword?: string;
}
