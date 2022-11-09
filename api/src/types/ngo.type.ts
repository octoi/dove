export type CreateNGOArgs = {
  name: string;
  description: string;
  profile: string;
  banner: string;
};

export type UpdateNGOArgs = {
  name?: string;
  description?: string;
  profile?: string;
  banner?: string;
};
