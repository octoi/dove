import { UserType } from './user.type';

export interface CommentType {
  id: number;
  comment: string;
  createdAt: string;
  user: UserType;
}
