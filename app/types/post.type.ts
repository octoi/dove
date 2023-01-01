export interface PostType {
  id: number;
  text: string;
  media?: string;
  createdAt: string;
  Like: {
    userId: number;
  }[];
  _count: {
    Like: number | null;
    Comment: number | null;
  };
}
