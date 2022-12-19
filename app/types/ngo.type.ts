import { UserType } from './user.type';

export interface NgoType {
  id: string;
  name: string;
  description: string;
  profile: string;
  banner: string;
  creatorId: number;
  creator?: UserType;
  members?: UserType[];
  admins?: UserType[];
}
